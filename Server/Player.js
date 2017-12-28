const config = require('../SharedVariables').config;
function Player(x, y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xSpeedDelta = 10;
    this.ySpeedDelta = 10;
    this.xSize = xSize;
    this.ySize = ySize;
}


Player.prototype.update = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > 900 - this.xSize){
        this.x = 900 - this.xSize;
    }
    else if (this.x < 0){
        this.x = 0;
    }
    if (this.y > 700 - this.ySize){
        this.y = 700 - this.ySize;
    }
    else if (this.y < 0){
        this.y = 0;
    }
};


Player.prototype.movementUpdate = function(info){
    if (info.state === false){
        return this.xSpeed = this.ySpeed = 0
    }
    if (info.key === 'left'){
        this.xSpeed = -this.xSpeedDelta;
        this.ySpeed = 0;
    }
    else if (info.key === 'right'){
        this.xSpeed = this.xSpeedDelta;
        this.ySpeed = 0;
    }
    else if (info.key === 'up'){
        this.xSpeed = 0;
        this.ySpeed = -this.ySpeedDelta;
    }
    else if (info.key === 'down'){
        this.xSpeed = 0;
        this.ySpeed = this.ySpeedDelta;
    }

};
module.exports = Player;

