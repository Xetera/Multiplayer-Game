function Pickup(x, y){
    this.x = x;
    this.y = y;

}


function Food(x, y, boost){
    Pickup.call(this, x , y);
    this.boost = boost;
    this.xSize = this.ySize= 10;
}

function SlowPotion(x, y, amount){
    this.amount = amount;
}


Food.prototype = Object.create(Pickup.prototype);
Food.prototype.constructor = Food;

SlowPotion.prototype = Object.create(Pickup.prototype);
SlowPotion.prototype.constructor = SlowPotion;


module.exports = Pickup;
module.exports = Food;
module.exports = SlowPotion;

