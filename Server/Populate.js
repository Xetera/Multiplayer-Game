const util = require('./Utility');
const Consumable = require('./Consumables');
const Enemies = require('./ComputerEntities');

exports.summonFood = function(){
    let dimensions = 10;

    for (let i=0; i < 50; i++){
        if (foods.length >= 50){
            return;
        }
        let [foodX, foodY] = util.randomCanvasPositions(dimensions);
        let food = new Consumable.Food(foodX, foodY, 1);

        // too spammy, maybe we can find a way to condense consecutive messages
        //util.log(util.Severity.INFO, `New Food Spawned x:${foodX} y:${foodY}`);
        foods.push(food);
    }
};

exports.summonPotions = function(){
    let dimensions = 10;

    for (let i=0; i < 3; i++){
      if (potions.length >= 3){
          return;
      }
      let [potX, potY] = util.randomCanvasPositions(10);
      let pot = new Consumable.SlowPotion(potX, potY, 0.9);
      potions.push(pot);
      console.log(pot);
  }
};

exports.summonEnemies = function(){
    let dimensions = 10;

    for (let i=0; i < 2; i++){
      if(enemies.length >= 2){
          return;
      }
      let [enemyX, enemyY] = util.randomCanvasPositions(dimensions);
      let enemy = new Enemies.Enemy(enemyX, enemyY, dimensions, dimensions, 3);
      enemies.push(enemy);
    }
};

exports.starTimer = function(){

};

