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
    this.followRadius = 400;
    this.type = entityType.Enemy;
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

    // nothing beyond here gets executed while we're following

    // don't spaz out if you're following a player
    this.randomMovement();


    let player = this.checkClosestPlayerDistance();
    if (player) {
        console.log('enemy update');
        this.following = player;
        this.follow(player);
        return;
    }
    // this only gets executed after we loop through every player and none of them
    // are in range of the enemy
    if (this.following.length) this.following = {};
};

/**
 * Checks
 * @returns {Player|Boolean}
 */
Enemy.prototype.checkClosestPlayerDistance = function(){
    let playersInRange = {};
    let ranges = [];
    for (let i in players){
        let distToPlayer = Math.sqrt(
            (this.x - players[i].x)**2 + (this.y - players[i].y)**2
        );
        // we don't want to make it follow other computer players
        if (distToPlayer < this.followRadius && players[i]['type'] === entityType.Player) {
            playersInRange[distToPlayer] = players[i];
        }
    }

    if (!playersInRange || Object.keys(playersInRange).length === 0){
        return false;
    }
    else if (playersInRange.length === 1){
        let obj = Object.keys(playersInRange)[0];

        // returning the player object
        return playersInRange[obj];
    }
    else {

        let keys = Object.keys(playersInRange);

        let min = Math.min(...keys); // array of distances

        // I'm not sure if there's ever going to be a time where 2 people
        // have the same range but we could control for that by just making
        // a random choice since it doesn't really matter
        if (min) {
            return playersInRange[min];
        }
        return false;
    }
    // in case more than one player is in range

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
Enemy.prototype.follow = function(player){
    let distance = util.calculateDistance(this.x, this.y, player.x, player.y);
    let yDiff = player.y - this.y;
    let xDiff = player.x - this.x;
    let angle = Math.atan2(yDiff, xDiff);
    this.xSpeed = Math.cos(angle);
    this.ySpeed = Math.sin(angle);
};


module.exports = {
  Enemy: Enemy
};