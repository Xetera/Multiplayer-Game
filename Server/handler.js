exports.changeDirection = function changeDirection(dirPackage){
    let direction;
    if (dirPackage.keyCode === 'ArrowUp'){
        direction = [0, -1 * dirPackage.ySpeedDelta];
    }
    else if (dirPackage.keyCode === 'ArrowDown'){
        direction = [0, 1 * dirPackage.ySpeedDelta];
    }
    else if (dirPackage.keyCode === 'ArrowLeft'){
        direction = [-1 * dirPackage.xSpeedDelta, 0]
    }
    else if (dirPackage.keyCode === 'ArrowRight'){
        direction = [1 * dirPackage.xSpeedDelta, 0];
    }
    //console.log(direction);
    return direction;
};

exports.checkFoodCollosion = function(foodArray, player){
    for (let i=0; i < foodArray.length; i++){
        foodArray[i].show();
        if ((Math.abs(player.x - foodArray[i].x) < player.xsize) &&
            (Math.abs(player.y - foodArray[i].y) < player.ysize)){
            player.xSpeedDelta++;
            player.ySpeedDelta++;
            foodArray.splice(i, 1);
            foodCounter++;
        }
    }
};

//module.export = changeDirection;