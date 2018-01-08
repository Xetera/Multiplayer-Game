let State = {};

State.Boot = function(game){

};

let loading;

let loadingFinished;

State.Boot.prototype = {
    preload: function(){
        game.load.image('loadingBlock', '../Media/LoadingCube.png');

        game.stage.backgroundColor = '#0072bc';

    },



    create: function(){

        this.state.start('Preloader');
    }
};

State.Preloader = function(game){

};

State.Preloader.prototype = {
    init:function(){
        game.time.advancedTiming = true;
    },
    preload: function(){

        loading = this.add.sprite(game.width/2 + 200, game.height/2 +100, 'loadingBlock');
        loading.anchor.setTo(0.5, 0.5);
        //this.add.sprite(loading);
        game.load.image('background','../Media/debug-grid.png');
        game.load.image('player','../Media/meme.jpg');
        game.load.image('food', '../Media/food.png');
        game.load.onLoadComplete.add(this.assetsLoaded, this);

    },
    update: function(){
        loading.angle += 6;
    },
    assetsLoaded: function(){
        loadingFinished = true;
    }

};

function loadComplete(){
    if (!loadingFinished) return false;

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    //player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.world.setBounds(0, 0, 1920, 1920);
    loading.kill();

    return true;
}
