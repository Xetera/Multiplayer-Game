const util = require('./Utility');

/**
 *
 * @param {number} time - In seconds
 * @constructor
 */
function Timer(time){
    // we might want to pass an object to this to make it flexible in terms of arguments
    // but since the game is meant to be fast paced, seconds seems about right to me

    // for now time has to be in seconds
    this.miliseconds = 1000;
    this.calls = 0;
     // 5 seconds for now
    this.initialTime = new Date();
    this.currentTime = this.initialTime;
    this.finalTime = new Date();
    this.finalTime.setMilliseconds(this.initialTime.getMilliseconds() + (time * 1000));
    this.finished = false;
    this.tickPerSec = 1000/60;
}


Timer.prototype.tick = function(){
    // should never be more than maxTime but oh well


    if ((this.currentTime.setMilliseconds(this.currentTime.getMilliseconds() + 1000/60)) > this.finalTime){
        this.finished = true;
        // we should essentially be able to call this from child but

        // we don't want to return here because we will be casting the effect from child instances
    }

    // since we have a clock speed we have to add the amount a single call takes which is 1000/60
    // instead of going ms by ms
    if (!this.finished){
        this.currentTime.setMilliseconds(this.currentTime.getMilliseconds() + 1000/60);
    }
};

Timer.prototype.cast = function(){};

Timer.prototype.destroy = function(){
    // not sure if this is something that's going to work but we'll find out
    if (timers.contains(this)){
      timers.splice(timers.indexOf(this), 1);
    }
};
/**
 *
 * @param {number} time - in seconds
 * @param {number} shrinkAmount
 * @constructor
 */
function ShrinkTimer(time, shrinkAmount){
    Timer.call(this, time);
    this.shrinkAmount = shrinkAmount;
}


ShrinkTimer.prototype = Object.create(Timer.prototype);
ShrinkTimer.prototype.constructor = ShrinkTimer;

ShrinkTimer.prototype.tick = function(){
  Timer.prototype.tick.call(this);
  if (this.finished){
      this.cast();
  }
};


ShrinkTimer.prototype.cast = function(){
    for (let i in players) {
        // I sure hope this doesn't cause problems later
        if (players.hasOwnProperty(i)) {
            if ((players[i].updateSize(-this.shrinkAmount)) < players[i].minSize) {
                // we're probably not going to implement and sort of death just because
                // it tends to make games really boring

                //players[i].die();

                // we still want the players to reach min size even if they're out of bounds
                players[i].updateSize(-(Math.abs(players[i].minSize -this.shrinkAmount)));
                continue;
            }
            players[i].updateSize(-this.shrinkAmount);
        }
    }
};

function SlowTimer(){
    Timer.call(this);
}

SlowTimer.prototype = Object.create(Timer.prototype);
SlowTimer.prototype.constructor = SlowTimer;



module.exports = {
    ShrinkTimer: ShrinkTimer,
    SlowTimer: SlowTimer
};

