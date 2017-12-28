exports.randomCanvasPositions = function(){
    let x = Math.floor(Math.random() * config.windowX);
    let y = Math.floor(Math.random() * config.windowY);
    return [x, y]
};

exports.random = function(range){
    return Math.floor(Math.random() * range);
};

exports.checkCollision = function(a, b){
    // yes, this is actually magic
    return (Math.abs(a.x - b.x) * 2 < (a.xSize + b.xSize)) &&
        (Math.abs(a.y - b.y) * 2 < (a.ySize + b.ySize))
};

exports.generateNick = function(){
    // this function removes name from the array so we don't get duplicates
    console.log(nicks.length);
    let index = Math.floor(Math.random() * nicks.length);
    return nicks.splice(index, 1);
};