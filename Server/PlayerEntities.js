const Entity = require('./Entity');
const util = require('./Utility');
const config = require('../SharedVariables');

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
    this.xSpeedDelta = 15;
    this.ySpeedDelta = 15;
    this.minSize = 10;

    this.type = entityType.Player;
    // the defaultNick
    this.defaultNick = util.generateNick();
    this.score = 0;

    // this is going to be a growing limit but we need to hard cap it at some point
    this.maxSize = 200;
    this.upgrades = this.availableUpgrades =
        JSON.parse(JSON.stringify(config.upgradesTemplate));
    let debug = false;

    this.powerups = {
            magnetized:
                {
                    status: false,
                    radius: 200
                }
        }

}

/*
 * We have to inherit the prototypes right after we declare the constructor
 * in order to avoid overwriting new prototypes
 */
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

/**
 * Updating the player based on its interaction with objects in the canvas.
 * The inherited update method is called to calculate movement automatically.
 */
Player.prototype.update = function(){
    // calling the update method from inherited prototype
    Entity.prototype.update.call(this);
    for (let i in foods){

        if (util.checkCollision(this, foods[i])){
            //this.xSpeedDelta += foods[i].boost;
            //this.ySpeedDelta += foods[i].boost;

            // in order to prevent infinite growth
            if (this.size < this.maxSize){
                this.size += foods[i].boost;

                // not sure if we want to restrict the player from gaining more score if they're max size
                this.score++;
            }

            // removing the food from the foods array after collision
            foods.splice(i, 1);
        }
    }
    for (let i in potions){
        if (util.checkCollision(this, potions[i])){
            // SpeedPotions are multipliers
            this.xSpeedDelta *= potions[i].amount;
            this.ySpeedDelta *= potions[i].amount;
            potions.splice(i, 1);
        }
    }
};

/**
 * Updates player speed / direction according to the information keyPress.
 *
 * @param   {Object}  info - Object returned from keyPress.
 * @param   {string}  info.keys - Name of keys.
 * @param   {Boolean} info.state - whether the keys is pressed or not.
 * @returns {void}
 */
// TODO: create enumeration for keys names instead of strings
Player.prototype.movementUpdate = function(info){

    /*
    if (info.keys.includes('space')){
        this.xSpeed = 0;
        this.ySpeed = 0;

    }
    */
    console.log(info);
    if (!info.keys.length){
        this.xSpeed = this.ySpeed = 0;
    }

    // no problem hardcoding these trig values since we're just working with cardinal directions

    // ex: since [left + up], this.xSpeed must equal a negative value, this.ySpeed must equal negative
    // cos(3pi/4) = -1/sqrt(2) therefore we don't need to take its negative again
    // sin(3pi/4) = 1/sqrt(2), we need it to be a negative value so we multiply it by negative yDelta
        // class dismissed
    else if (info.keys.includes('left') && info.keys.includes('up')){
        this.xSpeed = Math.cos(3 * Math.PI/4) * this.xSpeedDelta;
        this.ySpeed = Math.sin(3 * Math.PI/4) * -this.ySpeedDelta;
    }
    else if (info.keys.includes('left') && info.keys.includes('down')){
        this.xSpeed = Math.cos(5 * Math.PI/4) * this.xSpeedDelta;
        this.ySpeed = Math.sin(5 * Math.PI/4) * -this.ySpeedDelta;
    }
    else if (info.keys.includes('left')){
        this.xSpeed = -this.xSpeedDelta;
        this.ySpeed = 0;
    }
    else if (info.keys.includes('right') && info.keys.includes('up')){
        this.xSpeed = Math.cos(Math.PI/4) * this.xSpeedDelta;
        this.ySpeed = Math.sin(Math.PI/4) * -this.ySpeedDelta;
    }
    else if (info.keys.includes('right') && info.keys.includes('down')){
        this.xSpeed = Math.cos(7 * Math.PI/4) * this.xSpeedDelta;
        this.ySpeed = Math.sin(7 * Math.PI/4) * -this.ySpeedDelta;
    }
    else if (info.keys.includes('right')){
        this.xSpeed = this.xSpeedDelta;
        this.ySpeed = 0;
    }
    else if (info.keys.includes('up')){
        this.xSpeed = 0;
        this.ySpeed = -this.ySpeedDelta;
    }
    else if (info.keys.includes('down')){
        this.xSpeed = 0;
        this.ySpeed = this.ySpeedDelta;
    }

    // stopping with space

};

Player.prototype.updateAvailableUpgrades = function(){
    //console.log(this.availableUpgrades);
    if (!this.debug){

        // upgrades are added in order, 0th index is the first upgrade
        console.log('speedUpgrades');
        console.log(upgrades['speedUpgrades'][0]);
        this.availableUpgrades['speedUpgrades'] = upgrades['speedUpgrades'][0];
        this.debug = true;
    }
};

Player.prototype.purchaseUpgrade = function(name){

    let given_upgrade = this.availableUpgrades[name];
    let cost = -given_upgrade.cost;
    if (name === 'speedUpgrades'){
        // TODO: check if there are no more updates
        Entity.prototype.updateSpeed.call(this, given_upgrade.amount);
        console.log(this.upgrades[name]);
        Entity.prototype.updateSize.call(this, cost);
        //this.upgrades['speedUpgrades'].push(given_upgrade);
    }

    delete given_upgrade;
};

Player.prototype.magnetize = function(){
    // unlike enemy object's follow, we don't need another function to call this since
    // it's only activated with a player picks up a powerup

    if (!this.powerups.magnetized) return;
    for (let i in foods){
        let distance = util.calculateDistance(this.midpoint[0], this.midpoint[1]
            , foods[i].midpoint[0], foods[i].midpoint[1]);
        let yDiff = foods[i].midpoint[1] - this.midpoint[1];
        let xDiff = foods[i].midpoint[0] - this.midpoint[0];
        let angle = Math.atan2(yDiff, xDiff);
        foods[i].xSpeed

    }
};
module.exports = {
    Player: Player
};


