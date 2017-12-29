const Entity = require('./Entity');
const util = require('./Utility');

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
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    // calling the update method from inherited property
    Entity.prototype.update.call(this);
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

Player.prototype.awesome = function(){
    console.log("Hello I am awesome");
};

/**
 * Updates player speed / direction according to the information keyPressHandler.
 *
 * @param   {Object}  info - Object returned from keyPressHandler.
 * @param   {string}  info.key - Name of key.
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



module.exports = {
    Player: Player
};


