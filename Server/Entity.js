const config = require('../SharedVariables');
const util = require('./Utility');

/**
 * Base object for interactive things on the canvas. Has basic update functions
 *
 * @param {int} x - Initial X position on the canvas
 * @param {int} y - Initial Y position on the canvas
 * @param {int} xSize - Width
 * @param {int} ySize - Height
 * @constructor
 */

function Entity(x, y, xSize, ySize){
    this.x = x;
    this.y = y;
    this.xSize = 50 || xSize;
    this.ySize = 50 || ySize;
    this.xSpeedDelta = 0;
    this.ySpeedDelta = 0;
}

/**
 * Base update prototype for moving the object on the canvas and limiting it
 * to the size of the canvas
 */

Entity.prototype.update = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > config.windowX - this.xSize){
        this.x = config.windowX - this.xSize;
    }
    else if (this.x < 0){
        this.x = 0;
    }
    if (this.y > config.windowY - this.ySize){
        this.y = config.windowY - this.ySize;
    }
    else if (this.y < 0){
        this.y = 0;
    }
};


Entity.prototype.die = function(array){
    array.splice(array.indexOf(this), 1);
};

Entity.prototype.updateSize = function(amount){
    if (amount < 0 && (this.xSize - amount) < 0){
        return;
    }
    this.xSize += amount;
    this.ySize += amount;

};

Entity.prototype.updateSpeed = function(amount) {
    console.log(this.x);
    console.log('updateSpeed method');
    //console.log(this.xSpeedDelta);
    this.xSpeedDelta += amount;
    //console.log(this.xSpeedDelta);

    this.ySpeedDelta += amount;
};



module.exports = Entity;


