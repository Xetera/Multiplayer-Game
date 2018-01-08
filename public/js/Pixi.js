let game = new Phaser.Game(950, 700 , Phaser.AUTO, "phaser", {
    preload: preload,
    create: create
});

socket = io();

let canvasWidth;
let canvasHeight;

let self;

let foodCounter;
let foods = [];
let players = [];
let potions = [];

let upgrades = {};
let enemies = [];
let timers = [];

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
let player;
function preload(){
    game.load.image('loadingBlock', '../Media/LoadingCube.png');
    game.state.add('Boot', State.Boot);
    game.state.add('Preloader', State.Preloader);
    game.state.start('Boot');
}

function create(){


    //this.game.world.scale.setTo(0.5, 0.5);

}

// once page has loaded =>
$(function(){
    chatBox = $('#chatbox');
    chatInput = $('#chat-input');
    speedUpgrade = $('#speed-upgrade');
    imgSpeedUpgrade =  $('#img-speed-upgrade');
    speedStatText = $('#speed-stat-text');
    minSizeValue = $('#min-size-stat-text');
    maxSizeValue = $('#max-size-stat-text');
    score = $('#score-stat-text');
    size = $('#size-stat-text');

    game.world.scale.setTo(0.7, 0.7);
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
                player : player.id,
                nick: player.nick,
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

});



// passing
$(document).keydown((event)=>{
    handler.keyDownEvent(event);
});

$(document).keyup((event)=>{
    handler.keyUpEvent(event);
});