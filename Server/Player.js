const config = require('../SharedVariables').config;
function Player(x, y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xSpeedDelta = 5;
    this.ySpeedDelta = 5;
    this.xSize = xSize;
    this.ySize = ySize;

    this.score = 0;
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
    for (let i in foods){

        if ((Math.abs(this.x - foods[i].x) * 2 < (this.xSize + foods[i].xSize)) &&
        (Math.abs(this.y - foods[i].y) * 2 < (this.ySize + foods[i].ySize))){
            this.xSpeedDelta += foods[i].boost;
            this.ySpeedDelta += foods[i].boost;
            foods.splice(i, 1);
            // we don't want to use delete because it replaces i
            // with null
            //delete foods[i];
            this.score++;
        }

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

