/**
 *
 * @param {Object} pack
 */
exports.maxSize = function(pack){
    for (let i in players){
        if (players[i].id === pack.id) {
            players[i].size = players[i].maxSize;
            return;
        }
    }
};