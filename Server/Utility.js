exports.randomCanvasPositions = function(){
    let x = Math.floor(Math.random() * config.windowX);
    let y = Math.floor(Math.random() * config.windowY);
    return [x, y]
};