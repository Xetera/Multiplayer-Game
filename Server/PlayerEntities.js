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
    this.xSpeedDelta = 5;
    this.ySpeedDelta = 5;

    // the defaultNick
    this.defaultNick = util.generateNick();
    this.score = 0;

    // this is going to be a growing limit but we need to hard cap it at some point
    this.maxSize = 50;
    this.upgrades = this.availableUpgrades =
        JSON.parse(JSON.stringify(config.upgradesTemplate));
    let debug = false;

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
 * @param   {string}  info.key - Name of key.
 * @param   {Boolean} info.state - whether the key is pressed or not.
 * @returns {void}
 */
// TODO: create enumeration for key names instead of strings
Player.prototype.movementUpdate = function(info){

    // we could at some point think about having 8 cardinal directions
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

    // stopping with space
    else if (info.key === 'space'){
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
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

module.exports = {
    Player: Player
};


