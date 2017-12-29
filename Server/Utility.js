const config = require('../SharedVariables');
const color = require('colors');

/**
 * @summary Returns a random tuple (array) of x and y
 * @summary coordinates based on the canvas size.
 *
 * @returns {int[]}
 */
exports.randomCanvasPositions = function(){
    /*
    lets add a functionality to make sure that these don't spawn midway outside
    the canvas (and maybe on top of other items?) NOTE: this doesn't actually
    break the collision algorithm it would just look better
    */

    let x = Math.floor(Math.random() * config.windowX);
    let y = Math.floor(Math.random() * config.windowY);
    return [x, y]
};

exports.randRange = function(range){
    return Math.floor(Math.random() * range);
};


exports.randBool = function(){
  return Math.random () >= 0.5;
};

exports.checkCollision = function(a, b){
    // yes, this is actually magic
    // stolen from .NET rect collision detection
    if (b.x < a.x + a.xSize && a.x < b.x + b.xSize && b.y < a.y + a.ySize){
        return a.y < b.y + b.ySize;
    }
    else{
        return false;
    }

};

/**
 * @summary Removes a random name from the nicks array and returns it. Always unique.
 *
 * @returns {string}
 */
exports.generateNick = function(){
    console.log(config.nicks.length);
    let index = Math.floor(Math.random() * config.nicks.length);
    return config.nicks.splice(index, 1)[0];
};

const Severity = Object.freeze({
    INFO    : Symbol('symbol'),
    WARNING : Symbol('warning'),
    ERROR   : Symbol('error')
});

/**
 * Better logging for the problems
 *
 * @param {Severity} severity
 * @param {*} message
 */
exports.log = function(severity, message){
    if (severity === Severity.INFO){
        console.log(`[INFO]: ${message}`.green)
    }
    else if (severity === Severity.WARNING){
        console.log(`[WARNING]: ${message}`.yellow)
    }
    else if (severity === Severity.ERROR){
        console.log(`[ERROR]: ${message}`.red)
    }

};
exports.returnNick = function(socket){
    // we want to make sure that people who disconnect give
    // their default name back to the name pool so we don't run out of names
    config.nicks.push(players[socket.id]['defaultNick']);
};

exports.Severity = Severity;