const Entity = require('./Entity');
const util = require('./Utility');


/** AI controlled Enemy object
 *
 *
 * @inheritDoc
 *
 */

function Enemy(x, y, xSize, ySize, speed){
    Entity.call(this, x, y, xSize, ySize);
    this.xSpeedDelta = this.ySpeedDelta = speed;

}


Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;


/**
 * Random movement from the enemy, might later be overridden by a smarter ai.
 */

Enemy.prototype.update = function(){
    // as base enemy we want basic random movement.
    let xMovement = [-this.xSpeedDelta, 0, this.xSpeedDelta].randChoice();
    let yMovement = [-this.ySpeedDelta, 0, this.ySpeedDelta].randChoice();
    this.xSpeed = xMovement;
    this.ySpeed = yMovement;


    // calling parent update after calculations as AI entities do not have movement
    Entity.prototype.update.call(this);
};


Enemy.prototype.grow = function(amount){
    let growth = util.randBool();
    // we want different dimensions to grow based on luck pretty much
    if (growth){
        return this.xSize += amount;
    }
    this.ySize += amount;

};


module.exports = {
  Enemy: Enemy
};