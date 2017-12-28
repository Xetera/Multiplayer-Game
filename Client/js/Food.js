class Food {
    constructor(xpos, ypos){
        //console.log(typeof xpos);


        if (typeof xpos === "object"){
            this.x = xpos[0];
            this.y = xpos[1];
            return
        }
        this.x = xpos;
        this.y = ypos;
    }

    show(){
        fill(200);
        rect(this.x, this.y, 10, 10)
    }
    remove(){

    }
}