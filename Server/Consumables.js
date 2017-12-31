function Pickup(x, y){
    this.x = x;
    this.y = y;
    this.size = 10;

}

function Food(x, y, boost){
    Pickup.call(this, x , y);
    this.boost = boost;
}

function SlowPotion(x, y, amount){
    Pickup.call(this, x ,y);
    this.amount = amount;
}

Food.prototype = Object.create(Pickup.prototype);
Food.prototype.constructor = Food;

SlowPotion.prototype = Object.create(Pickup.prototype);
SlowPotion.prototype.constructor = SlowPotion;

module.exports = {
    Pickup: Pickup,
    Food: Food,
    SlowPotion: SlowPotion
};

