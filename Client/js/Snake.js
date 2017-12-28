class Snake{
    constructor(){

        this.playerid = random(100000, 99999);
        this.x = width/2;
        this.y = height/2;
        this.xSpeed = 0;
        this.ySpeed = 2;
        this.xSpeedDelta = 2;
        this.ySpeedDelta = 2;
        this.xsize = 10;
        this.ysize = 10;

    }

    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > width - this.xsize){
            this.x = width - this.xsize;
            loseGame();

        }
        else if (this.x < 0){
            loseGame();
            this.x = 0;
        }
        else if (this.y < 0){
            loseGame();
            this.y = 0;

        }
        else if (this.y > height - this.ysize){
            loseGame();
            this.y = height - this.ysize;

        }
    }
    show(){
        fill(255);
        rect(this.x, this.y, this.xsize, this.ysize)
    }
    dir(x, y){
        this.xSpeed = x;
        this.ySpeed = y;
    }

}
