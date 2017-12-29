"use strict";



let socket = io();
let self;
let foodCounter;
let foods = [];
let players = [];
let potions = [];
let ctx;

let init_nick = false;
let windowX = 900;
let windowY = 700;

for (let i in players){
    console.log(players[i].id);
    console.log(socket.id);
    if (players[i].id === socket.id){
        self = players[i];
    }
}

function updateDisplay(){

    ctx.fillStyle = "#b4b9b4";
    ctx.clearRect(0, 0 , 900, 700);


    // refreshing players
    for (let i in players){

        for (let i in players){
            if (players[i].id === socket.id){
                self = players[i];
                // we only want to update player defaultNick once
                // but we can't do it in another loop because
                // it's not guaranteed that players will exist
                if (!init_nick){
                    $('#defaultNick-input').val(players[i]['defaultNick']);
                }
                init_nick = true;
            }
        }

        ctx.fillStyle = '#93d7ff';
        ctx.fillRect(players[i].x,
            players[i].y, players[i].xSize, players[i].ySize);

        let nickX;
        let nickY;
        // name redrawing
        if (players[i].y - 20 < 0){
            nickY = players[i].y + 26 + players[i].ySize;
        }
        else {
            nickY = players[i].y - 26 ;
        }
        ctx.textAlign = 'center';
        ctx.fillText(players[i]['defaultNick'], players[i].x + (players[i].xSize/2), nickY);
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

    if (!init_nick){
    }

    // score display
    ctx.fillStyle = '#73b979';
    ctx.font = '30px Arial';
    ctx.fillText("Score: "+  self.score.toString(), 80, 50);

    // reverting font back to default
    ctx.font = '10px sans-serif';
}

$(function(){

    ctx = document.getElementById('ctx').getContext('2d');
    ctx.font = '30 px Arial';
    ctx.clearRect(0, 0 , 900, 700);

    let chatInput = $('#chat-input');

    $('#stats-form').onsubmit = function(e){
        e.preventDefault();
        console.log($('#speed').val());
    };

    chatInput.onsubmit = (e)=> {
        e.preventDefault();
        console.log($('#chat-input').val());
    };

    chatInput.click(function(){
        this.focus();
    });


});
let statsForm = $('#stats-form');

function getInfo(e){
    e.preventDefault();
    console.log(e.value);
}

$('#defaultNick-input').submit(event => {
    console.log(event);
   events.emitNewNick('s');
});

$(document).keydown((event)=>{
   keyDownHandler(event);
});

//TODO: Change pack.key identifier to enumeration from string names
function keyDownHandler(event){
    let pack = {};
    pack.id = socket.id;
    pack.state = true;
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
    else if (event.keyCode === 32){
        pack.key = 'space';
    }
    else {
        return;
    }
    events.emitKeyPress(pack);

}
/*
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
*/

