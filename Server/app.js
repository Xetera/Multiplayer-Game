// External Libraries
const express = require('express');
const path = require('path');
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv, {
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});
const port = process.env.PORT;


const handler = require('./Handler');
const Player = require ('./PlayerEntities');
const dispatch = require('./Dispatch');
const config = require('../SharedVariables');
const util = require('./Utility');

class Server {
    // useless object
    constructor(){
        app.set('trust proxy', true);
        app.use(express.static(__dirname + '../public'));
        this.dir = path.join(__dirname, '../public');
    }
}

server = new Server();

app.get('/', (req, res) => {
    console.log(`Received connection from ${req.ip}`);
    res.sendFile(server.dir + '/index.html', (err) => {
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
global.foods = [];
global.potions = [];
global.enemies = [];
global.SOCKET_LIST = {};
global.debug = true;

// New connection received
io.sockets.on('connection', (socket)=> {
    let ip = socket.handshake.address;

    SOCKET_LIST[socket.id] = socket;
    // it is acceptable to do this on connection as players only get one Entity to control
    players[socket.id] = new Player.Player(450, 350, 10, 10);
    console.log(`New player ${ip} connected as ${players[socket.id]['defaultNick']}`);

    // saving socket id as our identifier, we might need a game ID later on
    // but this is necessary to help the client identify itself easily
    players[socket.id]['id'] = socket.id;

    console.log(players);


    socket.on('keyPress', (pack)=>{
        handler.keyPress(pack);
    });

    socket.on('newMessage', (message)=>{
       let response = handler.newMessage(message);
       // checking if the message is a ping message
       if (!response.ping){
           util.emitAll('newMessage', response);
       }
       else {
           util.emitAll('ping', response);
       }
    });

    socket.on('disconnect', () => {
        console.log(`${ip} has disconnected.`);
        handler.disconnectPlayer(socket);
    });
});

setInterval( () => {
    dispatch.summonFood();
    dispatch.summonPotions();
    dispatch.summonEnemies();

    for (let i in players){
        if (players.hasOwnProperty(i)){
            players[i].update();
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

    util.emitAll('players', players);
    util.emitAll('food', foods);
    util.emitAll('potions', potions);
    util.emitAll('food', foods);

    util.emitAll('draw');

}, 1000/config.FPS);
// 60 for now


