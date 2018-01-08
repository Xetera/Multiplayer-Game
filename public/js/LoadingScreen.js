let game;
let preloadState = {
    preload: function(){
        game.time.advancedTiming = true;
        game.load.image('player','../Media/meme.jpg');
        game.load.image('background','../Media/debug-grid.png');
        game.load.image('food', '../Media/food.png');
    }
}