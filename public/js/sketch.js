"use strict";

let socket = io();
let self;
let foodCounter;
let foods = [];
let players = [];
let potions = [];

let upgrades = {};
let enemies = [];
let timers = [];

let canvasE;
let ctx;
let minimap;

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

let windowX = 400;
let windowY = 400;


$(function(){

    canvasE = document.getElementById('ctx');
    ctx = canvasE.getContext('2d');
    ctx.font = '30 px Arial';

    minimap = document.getElementById('minimap').getContext('2d');

    //ctx.clearRect(0, 0, windowX, windowY);

    chatBox = $('#chatbox');
    chatInput = $('#chat-input');
    speedUpgrade = $('#speed-upgrade');
    imgSpeedUpgrade =  $('#img-speed-upgrade');
    speedStatText = $('#speed-stat-text');
    minSizeValue = $('#min-size-stat-text');
    maxSizeValue = $('#max-size-stat-text');
    score = $('#score-stat-text');
    size = $('#size-stat-text');

    shrinkWorld(ctx, 0.3);
    shrinkWorld(minimap, 0.09);


    $('#stats-form').onsubmit = function(e){
        e.preventDefault();
        console.log($('#speed').val());
    };


    $(canvasE).click(pack=> {
        console.log(pack);
    });

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
            // TODO: do we really want to do this for every single keypress though?
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

// direction bugs out when we right click while moving
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

