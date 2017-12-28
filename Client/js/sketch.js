"use strict";



let socket = io();
let s;
let foodCounter;
let foods;




function setup() {
    frameRate(60);
    createCanvas(900, 700);
    emitNewCanvas();
    foodCounter = 0;
    foods = [];
    emitNewPlayer();

}

// this needs to be handled inside of sketch.js because of how
// p5.js works
function keyPressed(keyCode){
    let dirPackage= {};
    console.log(keyCode);
    dirPackage['keyCode'] = keyCode['key'];
    dirPackage['xSpeedDelta'] = s.xSpeedDelta;
    dirPackage['ySpeedDelta'] = s.ySpeedDelta;
    emitDirection(dirPackage);
}

function generateRandom(){
    let x = random(width);
    let y = random(height);
    return [x, y]
}

function createFood(){
    //console.log("Generated new food");
    // Food takes (x, y) as parameters
    foods.push(new Food(generateRandom()))
}



function draw() {
    background(51);

    emitPlayerPackage();

    if (foods.length < 50){
        createFood();
        //console.log(foods.length);
    }

    text(`Score: ${foodCounter}`, 10, 10);

    //logic for food collision
    for (let i=0; i < foods.length; i++){
        foods[i].show();
        if ((Math.abs(s.x - foods[i].x) < s.xsize) &&
            (Math.abs(s.y - foods[i].y) < s.ysize)){
            s.xSpeedDelta++;
            s.ySpeedDelta++;
            foods.splice(i, 1);
            foodCounter++;
        }
    }


}

function loseGame(){
    textAlign(CENTER);
    text("You lost", width/2, height/2);
}

function showAllPlayers(players){
    for (let i of players){
        fill(255);
        rect(i.x, i.y, i.xsize, i.ysize)
    }
}