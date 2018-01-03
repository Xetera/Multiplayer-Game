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
    this.following = {};
    this.followRadius = 20;

}


Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;


/**
 * Random movement from the enemy, might later be overridden by a smarter ai.
 */
Enemy.prototype.update = function(){
    // as base enemy we want basic random movement.

    Entity.prototype.update.call(this);

    // we're checking if we're already following a character here
    if (this.follow.length) return;
    else {
        this.follow();
    }
    // nothing beyond here gets executed while we're following

    // don't spaz out if you're following a player
    this.randomMovement();

    let player = this.checkDistance();
    if (player) this.follow(player);
    // this only gets executed after we loop through every player and none of them
    // are in range of the enemy
    if (this.following.length) this.following = {};
};

Enemy.prototype.checkDistance = function(){
    let playersInRange = [];
    let ranges = [];
    for (let i in players){
        let distToPlayer = Math.sqrt(
            (this.x - players[i].x)**2 + (this.y - players[i].y)**2
        );
        if (distToPlayer < this.followRadius) {
            players[i]['distance'] = distToPlayer;
            playersInRange.push(players[i]);
        }
    }
    for (let i in playersInRange){
        ranges.push(playersInRange[i]['distance']);
    }
    if (!playersInRange.length){
        return false;
    }
    else if (playersInRange.length === 1){
        return playersInRange[0];
    }
    // in case more than one player is in range
    else {
        
    }
};

Enemy.prototype.randomMovement = function(){
    let xMovement = [-this.xSpeedDelta, 0, this.xSpeedDelta].randChoice();
    let yMovement = [-this.ySpeedDelta, 0, this.ySpeedDelta].randChoice();
    this.xSpeed = xMovement;
    this.ySpeed = yMovement;
};


Enemy.prototype.grow = function(amount){
    let growth = util.randBool();
    // we want different dimensions to grow based on luck pretty much
    if (growth){
        return this.size += amount;
    }
    this.size += amount;

};

// we're gonna work on this
Enemy.prototype.follow = function(){

};


module.exports = {
  Enemy: Enemy
};