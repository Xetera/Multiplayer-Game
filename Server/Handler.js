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
    pack.ping = false;

    if (pack.msg[0] === '/'){

        let toEval = pack.msg.slice(1, pack.msg.length);

        if (toEval === 'ping'.trim().toLowerCase()){
            pack.ping = true;

            return pack;
        }

        try{
            response = eval(toEval);
        }

        catch (error) {
            response = error;
        }

        finally {
            pack.user = false;
            pack.msg = `${message} => ${response}`
        }
    }
    else{
        pack.msg = message;
    }

    return pack;
};