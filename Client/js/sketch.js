"use strict";



let socket = io();
let s;
let foodCounter;
let foods = [];
let players = [];
let potions = [];
let ctx;
let windowX = 900;
let windowY = 700;

function updateDisplay(){
    ctx.fillStyle = "#c8cdc8";
    ctx.clearRect(0, 0 , 900, 700);

    //console.log(pack);
    // refreshing players
    for (let i in players){
        ctx.fillStyle = '#93d7ff';
        ctx.fillRect(players[i].x, players[i].y, 10, 10);
    }
    // refreshing food display
    for (let i in foods){
        ctx.fillStyle = '#f18282';
        ctx.fillRect(foods[i].x, foods[i].y, 10, 10);

    }
    // refreshing potions
    for (let i in potions){
        ctx.fillStyle = "#ffd376";
        ctx.fillRect(potions[i].x, potions[i].y, 10, 10)
    }


}

$(function(){
    ctx = document.getElementById('ctx').getContext('2d');
    ctx.font = '30 px Arial';
    ctx.clearRect(0, 0 , 900, 700);

    $('#stats-form').onsubmit = function(e){
        e.preventDefault();
        console.log($('#speed').val());
    }



});
let statsForm = $('#stats-form');

function getInfo(e){
    e.preventDefault();
    console.log(e.value);
}

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
    if (event.keyCode === 68 || event.keyCode === 39){   //d or right
        pack.key = 'right';
    }
    else if (event.keyCode === 83 || event.keyCode === 40) {  //s or down
        pack.key = 'down';
    }
    else if (event.keyCode === 87 || event.keyCode === 38){ // w or up
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

