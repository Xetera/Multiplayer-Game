/**
 * Handler for the packages received from the client on 'keyPress'
 *
 * @param  {Object}  pack
 * @param  {string}  pack.key
 * @param  {Boolean} pack.state
 * @param  {string}  pack.id - Socket id assigned to the player
 */

exports.keyPressHandler = function(pack){
    for (let i in players){
        if (players.hasOwnProperty(i)){
            // iterate guard

            if (players[i]['id'] === pack.id){
                console.log(Object.getOwnPropertyNames(players[i]));
                players[i].movementUpdate(pack)
            }
        }
    }
};


//module.exports = keyPressHandler;