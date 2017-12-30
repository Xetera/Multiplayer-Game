/**
 *
 * @param {Object} pack
 */
exports.maxSize = function(pack){
    for (let i in players){
        if (players[i].id === pack.id) {
            players[i].xSize = players[i].maxSize;
            players[i].ySize = players[i].maxSize;
            return;
        }
    }
};