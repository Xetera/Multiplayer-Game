exports.keyPressHandler =  function keyPressHandler(pack){
    for (let i in players){
        if (players.hasOwnProperty(i)){
            // iterate guard

            if (players[i]['id'] === pack.id){
                players[i].movementUpdate(pack)
            }
        }
    }
};

//module.exports = keyPressHandler;