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
            (this.midpoint[0] - players[i].midpoint[0])**2 + (this.midpoint[1] - players[i].midpoint[1])**2
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
    // needs work
    let growth = util.randBool();
    // we want different dimensions to grow based on luck pretty much
    if (growth){
        return this.size += amount;
    }
    this.size += amount;

};

Enemy.prototype.follow = function(player){
    // this is the equation that's being used -> Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
    let distance = util.calculateDistance(this.midpoint[0], this.midpoint[1]
        , player.midpoint[0], player.midpoint[1]);
    // taking the difference between the two points to
    let yDiff = player.midpoint[1] - this.midpoint[1];
    let xDiff = player.midpoint[0] - this.midpoint[0];
    let angle = Math.atan2(yDiff, xDiff);
    this.xSpeed = Math.cos(angle);
    this.ySpeed = Math.sin(angle);
};

module.exports = {
  Enemy: Enemy
};