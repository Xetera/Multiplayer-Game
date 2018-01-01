
"use strict";

let socket = io();
let self;
let foodCounter;
let foods = [];
let players = [];
let potions = [];

let upgrades = {};

let ctx;
let keyPresses = {
    keys: []
};

let init_nick = false;

let speedUpgrade;
let imgSpeedUpgrade;
let speedStatText;
let minSizeValue;
let maxSizeValue;
let score;
let size;

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
    ctx.clearRect(0, 0 , 950, 700);

    chatBox = $('#chatbox');
    chatInput = $('#chat-input');
    speedUpgrade = $('#speed-upgrade');
    imgSpeedUpgrade =  $('#img-speed-upgrade');
    speedStatText = $('#speed-stat-text');
    minSizeValue = $('#min-size-stat-text');
    maxSizeValue = $('#max-size-stat-text');
    score = $('#score-stat-text');
    size = $('#size-stat-text');


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
        // not sure if this is the best way to be checking for something like this but it
        // shouldn't matter anyways because the client can't be trusted
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


$(document).contextmenu(function(){
    console.log('contextmenu');
    keyPresses.keys = [];


});


$(document).keydown((event)=>{
   handler.keyDownEvent(event);
});

$(document).keyup((event)=>{
    console.log('keyup');
    handler.keyUpEvent(event);
});

//TODO: Change pack.keys identifier to enumeration from string names

