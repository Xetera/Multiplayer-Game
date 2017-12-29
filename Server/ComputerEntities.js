const Entity = require('./Entity');
const util = require('./Utility');


/** AI controlled Enemy object
 *
 * @inheritDoc
 */

function Enemy(x, y, speed, xSize, ySize){
    Entity.call(this, x, y , xSize, ySize);
    this.xSpeedDelta = this.ySpeedDelta = speed;

}

/**
 * Random movement from the enemy, might later be overridden by a smarter ai.
 */

Enemy.prototype.update = function(){
    this.xSpeed = util.randRange(this.xSpeedDelta);
    this.ySpeed = util.randRange(this.ySpeedDelta);
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


Enemy.prototype = Object.create(Entity.prototype);
Enemy.constructor = Enemy;

module.exports = {
  Enemy: Enemy
};