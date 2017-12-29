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
    this.xSize = xSize;
    this.ySize = ySize;
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


/**
 * User controlled entity
 *
 * @inheritDoc
 *
 */
function Player(x, y, xSize, ySize) {
    Entity.call(this, x, y, xSize, ySize);

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xSpeedDelta = 5;
    this.ySpeedDelta = 5;

    // the nick
    this.nick = util.generateNick();
    this.score = 0;

    // this is going to be a growing limit but we need to hard cap it at some point
    this.maxSize = 50;
}

/**
 * Updating the player based on its interaction with objects in the canvas.
 * The inherited update method is called to calculate movement automatically.
 */

Player.update = function(){
    // calling the update method from inherited property
    Entity.update.call(this);
    for (let i in foods){

        if (util.checkCollision(this, foods[i])){
            //this.xSpeedDelta += foods[i].boost;
            //this.ySpeedDelta += foods[i].boost;

            // in order to prevent infinite growth
            if (this.xSize <= this.maxSize || this.ySize <= this.maxSize){
                this.xSize += foods[i].boost;
                this.ySize += foods[i].boost;

                // not sure if we want to restrict the player from gaining more score if they're max size
                this.score++;
            }


            foods.splice(i, 1);
        }
    }
    for (let i in potions){
        if (util.checkCollision(this, potions[i])){
            this.xSpeedDelta *= potions[i].amount;
            this.ySpeedDelta *= potions[i].amount;
            potions.splice(i, 1);
        }
    }

};


/**
 * Updates player movement according to the information keyPressHandler.
 *
 * @param   {Object} info - Object returned from keyPressHandler.
 * @param   {string} info.key - Name of key.
 * @param   {Boolean} info.state - whether the key is pressed or not.
 * @returns {void}
 */

// TODO: create enumeration for key names instead of strings
Player.prototype.movementUpdate = function(info){
    if (info.state === false){
        this.xSpeed = this.ySpeed = 0;
        return
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
    else if (info.key === 'space'){
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

};

Player.prototype = Object.create(Entity.prototype);
Player.constructor = Player;


module.exports = {
    Entity: Entity,
    Player: Player
};


