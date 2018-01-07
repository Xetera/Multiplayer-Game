let app = new PIXI.Application({
    width: 950,
    height:700,
    backgroundColor: 0x1099bb
});

let block = PIXI.Texture.fromImage('../Media/meme.jpg');
let canvasWidth;
let height;
let player;
let players = [];
$(function(){
    $('#footer').before(app.view);
    canvasWidth = app.screen.width;
    height = app.screen.height;
    player = new PIXI.Sprite(block);
    player.x = 100;
    player.y = 100;
    player.width = 50;
    player.height = 50;
    app.stage.addChild(player);

});
setInterval(function(){
    player.width += 1;
    player.height += 1;
}, 100);
//window.on('load', addEverything());