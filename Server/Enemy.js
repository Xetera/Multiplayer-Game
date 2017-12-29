const Player = require('./Player');
const util = require('./Utility');

Enemy = function(x, y, speed, xSize, ySize){
    Player.call(this, x, y , xSize, ySize);
    this.xSpeedDelta = this.ySpeedDelta = speed;

};

Enemy.prototype.grow = function(amount){
    let growth = util.randBool();
    // we want different dimensions to grow based on luck pretty much
    if (growth){
        return this.xSize += amount;
    }
    this.ySize += amount;

};

Enemy.prototype.update = function(){

};




Enemy.prototype = Object.create(Player.prototype);
Enemy.constructor = Enemy;

module.exports = {
  Enemy: Enemy
};