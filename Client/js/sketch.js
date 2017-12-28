"use strict";



let socket = io();
let s;
let foodCounter;
let foods;
let players =[];
let ctx;
let windowX = 900;
let windowY = 700;

function updateDisplay(pack){
    ctx.clearRect(0, 0 , 900, 700);
    //console.log(pack);
    for (let i in pack){

        ctx.fillRect(pack[i].x, pack[i].y, 10, 10)
    }

}

$(function(){

    ctx = document.getElementById('ctx').getContext('2d');
    ctx.font = '30 px Arial';
    ctx.clearRect(0, 0 , 900, 700);
    ctx.fillText('P', 400, 500);

});

$(document).keydown((event)=>{
   keyDownHandler(event);
});
/*
$(document).keyup((event)=>{
   keyUpHandler(event);
});
*/

function keyDownHandler(event){
    let pack = {};
    pack.id = socket.id;
    pack.state = true;
    console.log(event);
    if (event.keyCode === (68 || 39)){   //d or right
        pack.key = 'right';
    }
    else if (event.keyCode === (83 || 40)) {  //s or down
        pack.key = 'down';
    }
    else if (event.keyCode === (87 || 38)){ // w or up
        pack.key = 'up';
    }
    else if (event.keyCode === (65 || 37)){ // a or left
        pack.key = 'left';
    }
    else {
        return;
    }
    events.emitKeyPress(pack);

}

function keyUpHandler(event){
    let pack = {};

    pack.state = false;
    if (event.keyCode === 68 || event.keyCode === 39){   //d or right
        pack.key = 'right';
    }
    else if (event.keyCode === 83 || event.keyCode === 40) {  //s or down
        pack.key = 'down';
    }
    else if (event.keyCode === 87 ||event.keyCode === 38){ // w or up
        pack.key = 'up';
    }
    else if (event.keyCode === 65 || event.keyCode === 37){ // a or left
        pack.key = 'left';
    }
    else {
        return;
    }
    events.emitKeyPress(pack);
}

function randomPositionOnCanvas(){
    let x = Math.floor(Math.random() * windowX);
    let y = Math.floor(Math.random() * windowY);
    return [x, y]
}

