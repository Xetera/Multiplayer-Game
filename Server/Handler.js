const config = require('../SharedVariables');
const util = require('./Utility');

/**
 * Handler for the packages received from the client on 'keyPress'
 *
 * @param  {Object}  pack
 * @param  {string}  pack.key
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
exports.disconnectPlayer = function(socket){
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

    return pack;
};



exports.emitAll = function(emitStr, packet){
    for (let i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.emit(emitStr, packet)
    }
};