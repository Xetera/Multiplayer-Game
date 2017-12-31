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
    this.size = 50 || xSize;

    this.xSpeedDelta = 0;
    this.ySpeedDelta = 0;
    this.lerp = {};
}

/**
 * Base update prototype for moving the object on the canvas and limiting it
 * to the size of the canvas
 */

Entity.prototype.update = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > config.windowX - this.size){
        this.x = config.windowX - this.size;
    }
    else if (this.x < 0){
        this.x = 0;
    }
    if (this.y > config.windowY - this.size){
        this.y = config.windowY - this.size;
    }
    else if (this.y < 0){
        this.y = 0;
    }
};


Entity.prototype.die = function(array){
    array.splice(array.indexOf(this), 1);
};

// this is called only when we're manually updating the size from upgrades or potions
// when the size changes from pickups it's handled by update and no lerping is required
Entity.prototype.updateSize = function(amount){
    // making sure we don't shrink beyond a pixel
    if (amount < 1 && (this.size - amount) < 1){
        return;
    }

    // the amount of time it's gonna take for us to change time
    // probably not a big deal if it's hardcoded, we'll see
    let lerpTime = 5 * 100;
    // We're dealing with ticks so we can't have floats
    let lerpTicks = Math.floor(lerpTime/config.FPS);
    let sizeDelta = amount/lerpTicks;

    this.lerp['amount'] = (lerpTicks);
    this.lerp['ratio'] = sizeDelta;

};

// here we're checking the linear interpolation to avoid jittery movements
Entity.prototype.checkLerp = function(){
    // only runs when lerp[] exists

    // checking against isNaN feels
    if (isNaN(this.lerp['amount'])) return;

    if (this.lerp['amount'] !== 0){
        // we're doing += because if it's negative then we want to subtract size
        this.size += this.lerp['ratio'];
        this.lerp['amount']--;
    }
    else if (this.lerp['amount'] === 0){
        this.lerp = {};
    }

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


