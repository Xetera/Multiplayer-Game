const util = require('./Utility');
const config = require('../SharedVariables');

function Upgrade(cost, name, tier){
    this.id = util.generateRandomID();
    this.cost = cost;
    this.tier = tier;
    this.name = name;
    this.purchased = false;
    /*
    The way I want to do this is to have a large upgrades object where all
    available upgrades are stored from ascending order of tier that way
    it's possible to check for illegal purchases in a way
     */
}

Upgrade.prototype.purchase = function(player){
    // so far the idea is that every upgrade costs size unless we specify otherwise
    let sizeCost = -this.cost;
    player.updateSize(sizeCost);
    player.upgrades.push(this);
    this.purchased = true;
};


function SpeedUpgrade(cost, name, tier, upgradeAmount){
    Upgrade.call(this, cost, name);
    upgrades.speedUpgrades.push(this);
    this.amount = upgradeAmount;
}

SpeedUpgrade.prototype = Object.create(Upgrade.prototype);
SpeedUpgrade.prototype.constructor = SpeedUpgrade;

SpeedUpgrade.prototype.purchase = function(player){
    Upgrade.prototype.purchase.call(player);
    player.updateSize(this.amount);
};

module.exports = {
    SpeedUpgrade: SpeedUpgrade
};