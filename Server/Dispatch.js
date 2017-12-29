const util = require('./Utility');
const Consumable = require('./Consumables');
const Enemies = require('./ComputerEntities');

exports.summonFood = function(){
    for (let i=0; i < 50; i++){
        if (foods.length >= 50){
            return;
        }
        let [foodX, foodY] = util.randomCanvasPositions();
        let food = new Consumable.Food(foodX, foodY, 1);

        // too spammy, maybe we can find a way to condense consecutive messages
        //util.log(util.Severity.INFO, `New Food Spawned x:${foodX} y:${foodY}`);
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
      if(enemies.length >= 2){
          return;
      }
      let [enemyX, enemyY] = util.randomCanvasPositions();
      let enemy = new Enemies.Enemy(enemyX, enemyY, 10, 10, 3);
      enemies.push(enemy);
  }
};