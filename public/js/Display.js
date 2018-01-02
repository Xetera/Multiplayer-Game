
let cameraX;
let cameraY;

function updateDisplay(){


    let x1Offset = 450 - (self.size/2);
    let y1Offset = 350 - (self.size/2);
    let x2Offset = 2000-450 - (self.size/2);
    let y2Offset = 2000-350 - (self.size/2);
    ctx.clearRect(-1000, -1000, 4000, 4000); // this should be relative but I'm lazy
    if ((self.x <= x1Offset && self.y <= y1Offset) || (self.x <= x1Offset && self.y >= y2Offset) ||
        (self.x >= x2Offset && self.y <= y1Offset) || (self.x >= x2Offset && self.y >= y2Offset)) {

    }
    else if (self.x - 450 <= 0 || self.x + 450 + self.size >= 2000){
        ctx.translate(0, -self.ySpeed);
    }
    else if (self.y - 350 <= 0 || self.y + 350 + self.size >= 2000){
        ctx.translate(-self.xSpeed, 0);
    }

    else {
        ctx.translate(-self.xSpeed, -self.ySpeed);
    }

    // refreshing players
    for (let i in players){
        // updating things only for current player
        if (players[i].id === socket.id){


            ctx.fillStyle = "#b4b9b4";


            //ctx.fillRect(900/2 - (self.size/2), 700/2 - (self.size/2), self.size, self.size);

            // we only want to update player defaultNick once
            // but we can't do it in another loop because
            // it's not guaranteed that players will exist
            if (!init_nick){
                $('#defaultNick-input').val(players[i]['defaultNick']);
            }
            init_nick = true;

            // this is going to change dynamically server side as we update upgrades

            // singular upgrades inside all available upgrades

            updateSpeedIcon(players[i]);
            updateStats(players[i]);

        }




        //drawing the players
        ctx.fillStyle = '#86BA90';
        ctx.fillRect(players[i].x,
            players[i].y, players[i].size, players[i].size);

        //drawing player popup information - name and sizeBar
        let nickX;
        let nickY;

        let sizeBarXOffset = 15;
        let sizeBarYOffset;
        let sizeBarHeight = 9;
        // I'm not sure how to pass this as
        let sizeBarWidth = players[i].size + (2 * sizeBarXOffset);

        let growthPercentage = players[i].size / players[i].maxSize;
        let currentSizeBarXOffset = sizeBarXOffset - 2;
        let currentSizeBarHeight = sizeBarHeight - 3;

        let currentSizeBarWidth = (sizeBarWidth * growthPercentage) - 4/* accounting for the padding*/;
        // this changes based on whether bar is visible
        let currentSizeBarYOffset;


        // name redrawing

        if (players[i].y - 35 < 0) { // if info bar is obscured
            nickY = players[i].y + 26 + players[i].size;
            sizeBarYOffset = nickY - 20;
            currentSizeBarYOffset = sizeBarYOffset + 1;
        }
        else {  // if visible
            nickY = players[i].y - 26;
            sizeBarYOffset = nickY + 10;
            currentSizeBarYOffset = sizeBarYOffset + 1;
        }
        ctx.textAlign = 'center';
        ctx.fillText(players[i]['defaultNick'], players[i].x + (players[i].size/2), nickY);

        // filling maxSizeBar
        ctx.fillRect(players[i].x - sizeBarXOffset, sizeBarYOffset, sizeBarWidth, sizeBarHeight);


        // filling currentSizeBar

        // if player has reached max size
        if (players[i].maxSize === players[i].size){
            ctx.fillStyle = '#ba4340';

        }
        else {
            ctx.fillStyle = '#2f4fba';
        }
        ctx.fillRect(players[i].x - currentSizeBarXOffset, currentSizeBarYOffset,
            currentSizeBarWidth, currentSizeBarHeight);

        // filling percentage?


    }
    /* end of player loop */

    // refreshing food display
    for (let i in foods){
        ctx.fillStyle = '#f18282';
        ctx.fillRect(foods[i].x, foods[i].y, 10, 10);

    }
    // refreshing potions
    for (let i in potions){
        ctx.fillStyle = "#ffd376";
        ctx.fillRect(potions[i].x, potions[i].y, 10, 10)
    }

    if (!init_nick){
    }

    // reverting font back to default
    ctx.font = '12px sans-serif';
    for (let i in enemies){
        ctx.fillStyle = "#ff65f3";
        ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].size, enemies[i].size);
    }


}