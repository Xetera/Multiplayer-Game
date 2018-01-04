function Pickup(x, y){
    this.x = x;
    this.y = y;
    this.size = 10;
    this.midpoint = this.getMidpoint();
}

Pickup.prototype.getMidpoint = function(){
    return [this.x + (this.size/2), this.y + (this.size/2)]
};

function Food(x, y, boost){
    Pickup.call(this, x , y);
    this.boost = boost;
    this.magnetized = false;
}

Food.prototype = Object.create(Pickup.prototype);
Food.prototype.constructor = Food;


function SlowPotion(x, y, amount){
    Pickup.call(this, x ,y);
    this.amount = amount;
}

SlowPotion.prototype = Object.create(Pickup.prototype);
SlowPotion.prototype.constructor = SlowPotion;

module.exports = {
    Pickup: Pickup,
    Food: Food,
    SlowPotion: SlowPotion
};

