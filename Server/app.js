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
const timer = require('./Countdown');

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

app.get('SharedVariables', (req,res)=>{
    res.sendFile(server.dir + 'SharedVariables.js')
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
    // we should really not be calling this immediately after a connection
    // since the game is going to be arena-style we need to make sure that
    // later this gets called when players want to enter the game
    handler.playerConnect(socket);


    socket.on('dash', (pack)=> {
       players[socket.id].dash(pack);
    });

    // this packet is going to contain data about the mouse location of the
    socket.on('shoot', pack => {
      players[socket.id].shoot(pack);
    });

    socket.on('keyPress', (pack)=>{
        handler.keyPress(pack);
    });

    socket.on('newMessage', (message)=>{
        handler.newMessage(message);
    });

    socket.on('newPurchase', (pack) => {
        players[socket.id].purchaseUpgrade(pack)
    });

    socket.on('disconnect', () => {
        console.log(`${socket.handshake.address} has disconnected.`);
        handler.playerDisconnect(players[socket.id]);
    });
});

timerO = new timer.ShrinkTimer(3, 20);

// our main game loop
setInterval(() => {
    populate.summonFood();
    populate.summonPotions();
    populate.summonEnemies();



    // we need to change this mess to a bigger update-entities function
    for (let i in players){
        if (players.hasOwnProperty(i)){
            players[i].update();
            players[i].updateAvailableUpgrades();
            players[i].checkLerp(players[i]);
        }
    }
    for (let i in enemies){
        // for some reason [i] goes past members of enemies so this
        // prevents it from looping over random things
        if (enemies.hasOwnProperty(i)){
            enemies[i].update();
        }
    }

    // emitting new information to all players connected to the server

    // technically this is very very bad practice and we should have separate functions that picks
    // out the data that's suitable to send to prevent things like cheating but I can't really
    // be bothered at this point
    handler.emitAll('playerUpdate', players);
    handler.emitAll('foodsUpdate', foods);
    handler.emitAll('potionsUpdate', potions);
    handler.emitAll('upgradesUpdate', upgrades);
    handler.emitAll('enemiesUpdate', enemies);
    //handler.emitAll('timersInfo', timers);

    // sending empty packet to let client know it's the end of the frame
    // nothing is shown on the client side until this is emitted
    handler.emitAll('draw');


// FPS is 60 for now but we can lower it later if it's necessary
}, 1000/config.FPS);


