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

//module.export = changeDirection;