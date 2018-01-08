const config = require('../SharedVariables');
const util = require('./Utility');
const Bullet = require('./Bullet');

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
    this.minSize = 10;
    this.size = 50 || xSize;
    this.maxSize = 500;


    this.midpoint = this.getMidpoint();

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.type = entityType.Entity;
    this.xSpeedDelta = 0;
    this.ySpeedDelta = 0;


    this.lerp = {};
    this.dashStrength = 50;
    this.dashBaseCooldown = Math.floor((30 * 1000)/config.FPS); // ticks
    this.dashCooldown = 0;
    this.dashOnCooldown = false;
    this.dashes = {};
    // for bullets we just want a very basic implementation in Entity, we will update this
    // for players and AI separately
    this.bullets = [];
}

/**
 * Base update prototype for moving the object on the canvas and limiting it
 * to the size of the canvas
 */

Entity.prototype.update = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x >= config.windowX - this.size){
        this.x = config.windowX - this.size;
    }
    else if (this.x < 0){
        this.x = 0;
    }
    if (this.y >= config.windowY - this.size){
        this.y = config.windowY - this.size;
    }
    else if (this.y < 0){
        this.y = 0;
    }
    if (this.dashCooldown !== 0){
        this.dashCooldown--;
    }
    else {
        this.dashOnCooldown = false;
    }
    //updating the midpoint
    this.midpoint = this.getMidpoint();

    if (this.bullets.length){
        for (let i in this.bullets){
            this.bullets[i].update();
        }
    }
    //DEBUG
    //this.size= 50;
};

Entity.prototype.getMidpoint = function(){
    return [this.x + (this.size/2), this.y + (this.size/2)]
};

Entity.prototype.die = function(array){
    array.splice(array.indexOf(this), 1);
};

// this is called only when we're manually updating the size from upgrades or potions
// when the size changes from pickups it's handled by update and no lerping is required

Entity.prototype.updateSize = function(amount){
    // making sure we don't shrink beyond min size

    // although growing via food doesn't trigger this, we want to still
    // make sure that we're controlling for later points in the game where we grow with updateSize()
    if ((amount < 0 && (this.size - amount) < this.minSize) ||
        (amount > 0 && (this.size + amount) > this.maxSize)){
        return false;
    }

    // the amount of time it's gonna take for us to change time
    // probably not a big deal if it's hardcoded, we'll see
    let lerpTime = 5 * 100;
    // We're dealing with ticks so we can't have floats
    let lerpTicks = Math.floor(lerpTime/config.FPS);
    let sizeDelta = amount/lerpTicks;

    this.lerp['amount'] = (lerpTicks);
    this.lerp['ratio'] = sizeDelta;
    return this.size;
};

// here we're checking the linear interpolation to avoid jittery movements

Entity.prototype.checkLerp = function(player){
    // only runs when lerp[] exists

    // checking against isNaN feels
    if (!isNaN(this.lerp['amount'])){

        if (this.lerp['amount'] !== 0){
            // we're doing += because if it's negative then we want to subtract size
            this.size += this.lerp['ratio'];
            this.lerp['amount']--;
        }
        else if (this.lerp['amount'] === 0){
            this.lerp = {};
        }

    }

    // same thing for dashing since it's technically a lerp of a teleport
    if (!isNaN(this.dashes['amount'])){
        if(this.dashes['amount'] !== 0){
            console.log('dashing');
            this.xSpeed = this.dashes.x;
            this.ySpeed = this.dashes.y;
            this.dashes['amount']--;
        }
        else if (this.dashes['amount'] === 0){
            // resetting speed after dash
            this.movementUpdate(this.dashes.direction);

            this.dashes = {};
        }

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
/**
 *
 * @param direction
 * @param {number} magnitude
 */

Entity.prototype.dash = function(direction) {
    // direction will be a keypress array most likely
    // TODO: make this scale with speed so it doesn't become obsolete later on
    if (this.dashOnCooldown) return util.log(util.Severity.INFO, 'prevented Dash');

    console.log(direction);

    if (!direction.keys.length){
        return;
    }

    this.dashOnCooldown = true;
    this.dashCooldown = this.dashBaseCooldown;


    this.dashes.direction = direction;

    if (direction.keys.includes('left') && direction.keys.includes('up')){
        this.dashes.x = Math.cos(3 * Math.PI/4) * this.dashStrength;
        this.dashes.y = Math.sin(3 * Math.PI/4) * -this.dashStrength;
    }
    else if (direction.keys.includes('left') && direction.keys.includes('down')){
        this.dashes.x = Math.cos(5 * Math.PI/4) * this.dashStrength;
        this.dashes.y= Math.sin(5 * Math.PI/4) * -this.dashStrength;
    }
    else if (direction.keys.includes('left')){
        this.dashes.x = -this.dashStrength;
        this.dashes.y = 0;
    }
    else if (direction.keys.includes('right') && direction.keys.includes('up')){
        this.dashes.x= Math.cos(Math.PI/4) * this.dashStrength;
        this.dashes.y = Math.sin(Math.PI/4) * -this.dashStrength;
    }
    else if (direction.keys.includes('right') && direction.keys.includes('down')){
        this.dashes.x = Math.cos(7 * Math.PI/4) * this.dashStrength;
        this.dashes.y = Math.sin(7 * Math.PI/4) * -this.dashStrength;
    }
    else if (direction.keys.includes('right')){
        this.dashes.x = this.dashStrength;
        this.dashes.y= 0;
    }
    else if (direction.keys.includes('up')){
        this.dashes.x = 0;
        this.dashes.y = -this.dashStrength;
    }
    else if (direction.keys.includes('down')){
        this.dashes.x = 0;
        this.dashes.y = this.ySpeedDelta;
    }
    this.dashes.magnitude = Math.sqrt((this.dashes.x ** 2) + (this.dashes.y ** 2));

    let dashSeconds = 0.3 * 1000;
    this.dashes.amount = Math.floor(dashSeconds/config.FPS);
    console.log(this.dashes);

};

/**
 *
 * @param {int[]} mouseLocation
 */
Entity.prototype.shoot = function (mouseLocation) {
    this.bullets.push(new Bullet(10));
};

// This sounds like REALLY bad practice but I can't think of another way of
// doing this without putting the module export in a an object
global.entityType = Object.freeze({
    Entity: 0,
    Player: 1,
    Enemy: 2
});

module.exports = Entity;


