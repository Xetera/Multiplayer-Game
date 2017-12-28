const util = require('./Utility');
const Food = require('./Consumables');

exports.summonFood = function(){
    for (let i=0; i < 50; i++){
        if (foods.length >= 50){
            return;
        }
        let [foodX, foodY] = util.randomCanvasPositions();
        foods.push(new Food(foodX, foodY, 1));
    }
};

exports.summonPotions = function(){
  for (let i=0; i < 3; i++){
      if (potions.length >= 3){
          return;
      }
      let [potX, potY] = util.randomCanvasPositions();
      potions.push(new SlowPotion(potX, potY))
  }
};