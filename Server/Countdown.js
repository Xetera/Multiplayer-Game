function Timer(time){
    this.miliseconds = 1000;
    this.currentTime = 0;
    // 5 seconds for now
    this.maxTime = time * this.miliseconds;
    this.finished = false;
}


Timer.prototype.tick = function(){
    // should never be more than maxTime but oh well
    if ((this.currentTime++) >= this.maxTime){
        return this.finished = true;
    }
    this.currentTime++;
};

Timer.prototype.cast = function(){

};

/**
 *
 * @param {number} time - in seconds
 * @param {number} shrinkAmount
 * @constructor
 */
// it's possible that we might want to make this also grow the computer entities so
// the game gets harder and harder every round
function ShrinkTimer(time, shrinkAmount){
    Timer.call(this, time);
    this.shrinkAmount = shrinkAmount;
}


ShrinkTimer.prototype = Object.call(Timer.prototype);
ShrinkTimer.prototype.constructor = ShrinkTimer;


ShrinkTimer.prototype.cast = function(){
    for (let i in players) {
        // I sure hope this doesn't cause problems later
        if (players.hasOwnProperty(i)) {
            if ((players[i].size - this.shrinkAmount) < 0) {
                players[i].die();
                continue;
            }
            players[i].size -= this.shrinkAmount;
        }
    }
};

function SlowTimer(){
    Timer.call(this);
}

SlowTimer.prototype = Object.call(SlowTimer.prototype);
SlowTimer.prototype.constructor = SlowTimer;



module.exports = ShrinkTimer;
module.exports = SlowTimer;