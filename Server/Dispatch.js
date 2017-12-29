const util = require('./Utility');
const Consumable = require('./Consumables');

exports.summonFood = function(){
    for (let i=0; i < 50; i++){
        if (foods.length >= 50){
            return;
        }
        let [foodX, foodY] = util.randomCanvasPositions();
        let food = new Consumable.Food(foodX, foodY, 1);
        console.log(food);
        foods.push(food);
    }
};

exports.summonPotions = function(){
  for (let i=0; i < 3; i++){
      if (potions.length >= 3){
          return;
      }
      let [potX, potY] = util.randomCanvasPositions();
      let pot = new Consumable.SlowPotion(potX, potY, 0.9);
      potions.push(pot);
      console.log(pot);
  }
};

exports.summonEnemies = function(){
  for (let i=0; i < 2; i++){

  }
};