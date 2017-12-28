exports.randomCanvasPositions = function(){
    let x = Math.floor(Math.random() * config.windowX);
    let y = Math.floor(Math.random() * config.windowY);
    return [x, y]
};

exports.random = function(range){
    return Math.floor(Math.random() * range);
};

exports.checkCollision = function(a, b){
    return (Math.abs(a.x - b.x) * 2 < (a.xSize + b.xSize)) &&
        (Math.abs(a.y - b.y) * 2 < (a.ySize + b.ySize))
};

exports.generateNick = function(){
    return nicks[Math.floor(Math.random() * nicks.length)];
};