const config = require('../SharedVariables');
const util = require('./Utility');

/**
 * Base player object for interactive things on the canvas. Also used as the base for Enemy type.
 *
 * @param {int} x - Initial X position on the canvas
 * @param {int} y - Initial Y position on the canvas
 * @param {int} xSize - Width
 * @param {int} ySize - Height
 * @constructor
 *
 */
function Player(x, y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xSpeedDelta = 5;
    this.ySpeedDelta = 5;
    this.xSize = xSize;
    this.ySize = ySize;

    this.nick = util.generateNick();
    this.score = 0;
    this.maxSize = 50;
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

        if (util.checkCollision(this, foods[i])){
            //this.xSpeedDelta += foods[i].boost;
            //this.ySpeedDelta += foods[i].boost;

            this.xSize += foods[i].boost;
            this.ySize += foods[i].boost;
            foods.splice(i, 1);
            // we don't want to use delete because it replaces i
            // with null
            //delete foods[i];
            this.score++;
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
 * @summary Updates player movement according to the information
 *
 * @param   {Object} info - Object returned from handler.keyPressHandler
 * @param   {string} info.key - Name of key
 * @param   {Boolean} info.state - whether the key is pressed or not
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
console.log
module.exports = Player;

