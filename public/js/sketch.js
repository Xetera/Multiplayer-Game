"use strict";

let socket = io();
let self;
let foodCounter;
let foods = [];
let players = [];
let potions = [];

let upgrades = {};

let ctx;


let init_nick = false;
let windowX = 900;
let windowY = 700;

let speedUpgrade;
let imgSpeedUpgrade;
let speedStatText;
let minSizeValue;
let maxSizeValue;
let score;

let chatBox;
let chatInput;

let ping;

for (let i in players){
    console.log(players[i].id);
    console.log(socket.id);
    if (players[i].id === socket.id){
        self = players[i];
    }
}


$(function(){

    ctx = document.getElementById('ctx').getContext('2d');
    ctx.font = '30 px Arial';
    ctx.clearRect(0, 0 , 900, 700);

    chatBox = $('#chatbox');
    chatInput = $('#chat-input');
    speedUpgrade = $('#speed-upgrade');
    imgSpeedUpgrade =  $('#img-speed-upgrade');
    speedStatText = $('#speed-stat-text');
    minSizeValue = $('#min-size-stat-text');
    maxSizeValue = $('#max-size-stat-text');
    score = $('#score-size-stat-text');

    $('#stats-form').onsubmit = function(e){
        e.preventDefault();
        console.log($('#speed').val());
    };


    chatInput.keydown(function(e){
        console.log(e.keyCode);
        if (e.keyCode === 13) {
            if (chatInput.text() === ""){
                console.log('returning focus');
                chatInput.html("");
                chatInput.blur();
                return;
            }
            let message = chatInput.text();
            console.log(message);
            chatInput.html("");

            // TODO: handle cases where user has custom name
            let pack = {
                msg: message,
                player : self.id,
                nick: self.defaultNick,
                user: true
            };

            // we do handling server side

            ping = Date.now();

            events.emitNewMessage(pack);

        }
        else if (e.keyCode === 27){

            chatInput.html("");
            chatInput.blur();
        }
    });


    // this has to be an ES5 type function, not an arrow function
    speedUpgrade.click(function (){
        if ($('#img-speed-upgrade').hasClass('disabled')){
            return;
        }

        console.log('bought');
        events.emitNewPurchase('speedUpgrades');
    });



});

$('#defaultNick-input').submit(event => {
    console.log(event);
   events.emitNewNick('s');
});

$(document).keydown((event)=>{
   keyDownHandler(event);
});

//TODO: Change pack.key identifier to enumeration from string names
function keyDownHandler(event){
    // for some reason chat input selector needs an index for this
    if (document.activeElement === chatInput[0]){
        return
    }
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
    else if (event.keyCode === 13){
        $('#chat-input').focus();
        return;
    }
    else {
        return;
    }
    events.emitKeyPress(pack);

}
