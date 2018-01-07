const config = require('../SharedVariables');


function Bullet(size, x ,y, xSpeed, ySpeed){
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
}

// this is going to be the base update
Bullet.prototype.update = function(player){
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // destroying the bullet once it hits the window boundaries
    if (this.x < 0 || this.y < 0 || this.x > config.windowX || this.y > config.windowY){
        this.destroy(player.bullets);
    }

};
/**
 * Removes bullet from the bullet array of the player that it's in
 * @param {Bullet[]} array
 */
Bullet.prototype.destroy = function(array){
    array.splice(array.indexOf(this), 1);
};


module.exports.Bullet = Bullet;