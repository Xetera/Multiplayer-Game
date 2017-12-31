// External Libraries, literally copy pasted
const express = require('express');
const path = require('path');
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv, {
    serveClient: false,

    // sometimes we get double connections for some reason so
    // this is a way to deal with it ( sometimes it doesn't work though )
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

// Heroku does not allow hardcoded ports but we want
// our development env to be at 1337 because we're edgy
const port = process.env.PORT || 1337;

// assets
const handler = require('./Handler');
const Player = require ('./PlayerEntities');
const populate = require('./Populate');
const config = require('../SharedVariables');
const util = require('./Utility');
const upg = require('./Upgrades');

class Server {
    // useless object
    constructor(){
        app.set('trust proxy', true);
        app.use(express.static(path.join(__dirname, '../public')));
        this.dir = path.join(__dirname, '../public/');
    }
}

server = new Server();

app.get('/', (req, res) => {
    console.log(`Received connection from ${req.ip}`);
    res.sendFile(server.dir + 'index.html', (err) => {
        if (err) console.log(err);
    });
});

app.get('/js/:module', (req, res)=>{
    res.sendFile(server.dir + req.params.module, (err)=>{
        if (err) console.log(err);
    })
});

app.get('/css/:module', (req, res)=>{
   res.sendFile(server.dir + req.params.module, (err)=>{
      if (err) console.log(err);
   });
});

app.get('/Media/:img', (req,res)=>{
   res.sendFile(server.dir + req.params.img, (err)=>{
       if (err) console.log(err);
   })
});


serv.listen(port, () => {
    console.log(`Server now listening on port ${port}`)
});


/*
=================================================================================================
=========================================== Game Setup ==========================================
=================================================================================================
*/

// Global variables to avoid having to constantly pass around a bunch of arguments

global.players = {};
global.SOCKET_LIST = {};

global.foods = [];
global.potions = [];
global.enemies = [];
global.timers = [];

global.upgrades = JSON.parse(JSON.stringify(config.upgradesTemplate));

// used to disable the eval function later so we don't get le epic hacked
global.debug = true;



let speedUpgrade1 = new upg.SpeedUpgrade(25 , "spd1", 1, 1);
let speedUpgrade2 = new upg.SpeedUpgrade(30, "spd2", 2, 2);
let speedUpgrade3 = new upg.SpeedUpgrade(50, "spd3", 3, 3);

upgrades.speedUpgrades = [speedUpgrade1, speedUpgrade2, speedUpgrade3];

// New connection received
io.sockets.on('connection', (socket)=> {
    // edgily logging connection IP like the script kiddies we are
    let ip = socket.handshake.address;
    SOCKET_LIST[socket.id] = socket;
    // it is acceptable to do this on connection as players only get one Entity to control
    // but ideally we should be handling this somewhere
    players[socket.id] = new Player.Player(450, 350, 10, 10);
    util.log(util.Severity.INFO, `New player ${ip} connected as ${players[socket.id]['defaultNick']}`);

    // saving socket id as our identifier, we might need a game ID later on
    // but this is necessary to help the client identify itself easily
    players[socket.id]['id'] = socket.id;

    console.log(players[socket.id]);

    // things we have to emit to the connection before it starts looking for
    // elements that don't exist

    //socket.emit('upgrades', allUpgrades);

    socket.on('keyPress', (pack)=>{
        handler.keyPress(pack);
    });

    socket.on('newMessage', (message)=>{
        let response = handler.newMessage(message);

        // escape gracefully if we returned prematurely from handler
        if (!response){
           return;
        }
        // checking if the message is a ping message
        if (!response.ping){
            handler.emitAll('newMessage', response);
        }

        // could be a good idea to move these special server commands
        else {
            // TODO: hide ping message from the rest of the server later
            handler.emitAll('getPing', response);
        }
    });

    socket.on('newPurchase', (pack) => {
        players[socket.id].purchaseUpgrade(pack)
    });

    socket.on('disconnect', () => {
        console.log(`${ip} has disconnected.`);
        handler.disconnectPlayer(socket);
    });
});


// our main game loop
setInterval(() => {
    populate.summonFood();
    populate.summonPotions();
    populate.summonEnemies();


    for (let i in players){
        if (players.hasOwnProperty(i)){
            players[i].update();
            players[i].updateAvailableUpgrades();
        }
    }
    for (let i in enemies){
        // for some reason [i] goes past members of enemies so this
        // prevents it from looping over random things
        if (enemies.hasOwnProperty(i)){

            enemies[i].update();
        }
    }

    //emitting new information to all players connected to the server
    handler.emitAll('playerInfo', players);
    handler.emitAll('foodInfo', foods);
    handler.emitAll('potionInfo', potions);
    handler.emitAll('upgradesInfo', upgrades);


    // sending empty packet to let client know it's the end of the frame
    // nothing is shown on the client side until this is emitted
    handler.emitAll('draw');


// FPS is 60 for now but we can lower it later if it's necessary
}, 1000/config.FPS);


