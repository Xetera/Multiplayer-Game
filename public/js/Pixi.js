let windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;
let app = new PIXI.Application({
    width: 900,
    height:700,
    backgroundColor: 0x1099bb
});

function removeEverything(){
    $('#main').each(function(i,o) {
        let elem = $(o);
        elems.push({
            loc: elem.prev(),
            obj: elem.detach()
        });
    });
}

function addEverything(){
    while (elems.length) {
        let elem = elems.pop();
        elem.loc.after(elem.obj);
    }
}
let elems = [];


$(function(){


    //$('#mid-container')[0].appendChild(app.view);
    $('#footer').before(app.view);
    // create a new Sprite from an image path
    // draw rectangle
    let rectangle = new PIXI.Graphics();
    rectangle.beginFill( 0xffffff );
    rectangle.moveTo( 0, 0 );
    rectangle.lineTo( 0, 10);
    rectangle.lineTo( 10, 10);
    rectangle.lineTo( 10, 0 );
    rectangle.endFill();


    rectangle.anchor.set(0.5);

    // center the sprite's anchor point


    // move the sprite to the center of the screen
    rectangle.x = app.screen.width / 2;
    rectangle.y = app.screen.height / 2;

    app.stage.addChild(rectangle);

    // Listen for animate update
    app.ticker.add(function(delta) {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent tranformation
        rectangle.rotation += 0.1 * delta;
    });
});
//window.on('load', addEverything());