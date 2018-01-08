const config = require('../SharedVariables');
const util = require('./Utility');
const Player = require('./PlayerEntities');

exports.playerConnect = function(socket){
    // edgily logging connection IP like the script kiddies we are
    let ip = socket.handshake.address;
    SOCKET_LIST[socket.id] = socket;

    players[socket.id] = new Player.Player(450, 350, 10, 10);
    util.log(util.Severity.INFO, `New player ${ip} connected as ${players[socket.id]['defaultNick']}`);

    // saving socket id as our identifier, we might need a game ID later on
    // but this is necessary to help the client identify itself easily
    players[socket.id]['id'] = socket.id;

    this.emitAll('playerConnect', players[socket.id]);
};


/**
 * Handler for the packages received from the client on 'keyPress'
 *
 * @param  {Object}  pack
 * @param  {string}  pack.keys
 * @param  {Boolean} pack.state
 * @param  {string}  pack.id - Socket id assigned to the player
 */

exports.keyPress = function(pack){
    for (let i in players){
        if (players.hasOwnProperty(i)){
            // iterate guard

            if (players[i]['id'] === pack.id){
                players[i].movementUpdate(pack)
            }
        }
    }
};


exports.setName = function(){

};

/**
 * Disconnects player from the game and returns
 * @param socket - socket of the disconnected player
 * @return {Boolean} - Disconnect success status
 */
exports.playerDisconnect = function(socket){
    try{
        if (players[socket.id]['defaultNick']){
            util.returnNick(socket);
        }

        // delete on objects works properly unlike arrays
        delete players[socket.id];
        delete SOCKET_LIST[socket.id];
    }
    catch (e){
        console.log(e);
        return false
    }
    return true;
};

exports.newMessage = function(pack){
    let message;
    message = pack.msg.trim();
    let response;
    if (typeof pack.ping !== 'undefined' && pack.ping !== false){

        // for catching ping response and assigning it a server status
        // since the first time a ping message comes we assign it a ping status
        // later on, it's ok to check for it here since it would only trigger this
        // if it was a reply
        pack.user = false;
        // we have to unAssign ping from it so it doesn't loop
        pack.ping = false;
    }
    else{
        pack.ping = false;
    }
    console.log(pack);
    if (pack.msg[0] === '/'){

        let toEval = pack.msg.slice(1, pack.msg.length);

        if (toEval.trim().toLowerCase() === 'ping'){
            pack.ping = true;
            console.log("Got ping request");
            return pack;
        }

        // debug cheating
        else if (toEval.trim().toLowerCase() === 'max'){
            console.log()

        }

        try{
            response = eval(toEval);
        }

        catch (error) {
            response = error;
        }

        finally {
            pack.user = false;

            pack.msg = `${JSON.stringify(response, null, 1)}`


        }
    }
    else{
        pack.msg = message;
    }
    // checking if the message is a ping message
    // I'm really not sure why we're not doing this
    if (!pack.ping){
        this.emitAll('newMessage', pack);
    }

    // could be a good idea to move these special server commands
    else {
        // TODO: hide ping message from the rest of the server later
        this.emitAll('getPing', pack);
    }
};

exports.mouseLocation = function(pack){


};


exports.emitAll = function(emitStr, packet){
    for (let i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.emit(emitStr, packet)
    }
};