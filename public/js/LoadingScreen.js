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
    },
    create: function(){
        this.state.start('Main');

    }

};

function loadComplete(){
    if (!loadingFinished) return false;


    loading.kill();

    return true;
}
