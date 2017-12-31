
function updateDisplay(){

    ctx.fillStyle = "#b4b9b4";
    ctx.clearRect(0, 0 , 900, 700);


    // refreshing players
    for (let i in players){
        if (players[i].id === socket.id){
            self = players[i];
            // we only want to update player defaultNick once
            // but we can't do it in another loop because
            // it's not guaranteed that players will exist
            if (!init_nick){
                $('#defaultNick-input').val(players[i]['defaultNick']);
            }
            init_nick = true;
        }

        //if (players[i].xSize > )


        //drawing the players
        ctx.fillStyle = '#86BA90';
        ctx.fillRect(players[i].x,
            players[i].y, players[i].xSize, players[i].ySize);

        //drawing player popup information - name and sizeBar
        let nickX;
        let nickY;

        let sizeBarXOffset = 15;
        let sizeBarYOffset;
        let sizeBarHeight = 9;
        // I'm not sure how to pass this as
        let sizeBarWidth = players[i].xSize + (2 * sizeBarXOffset);

        let growthPercentage = players[i].xSize / players[i].maxSize;
        let currentSizeBarXOffset = sizeBarXOffset - 2;
        let currentSizeBarHeight = sizeBarHeight - 3;

        let currentSizeBarWidth = (sizeBarWidth * growthPercentage) - 4/* accounting for the padding*/;
        // this changes based on whether bar is visible
        let currentSizeBarYOffset;


        // name redrawing

        if (players[i].y - 35 < 0) { // if info bar is obscured
            nickY = players[i].y + 26 + players[i].ySize;
            sizeBarYOffset = nickY - 20;
            currentSizeBarYOffset = sizeBarYOffset + 1;
        }
        else {  // if visible
            nickY = players[i].y - 26;
            sizeBarYOffset = nickY + 10;
            currentSizeBarYOffset = sizeBarYOffset + 1;
        }
        ctx.textAlign = 'center';
        ctx.fillText(players[i]['defaultNick'], players[i].x + (players[i].xSize/2), nickY);

        // filling maxSizeBar
        ctx.fillRect(players[i].x - sizeBarXOffset, sizeBarYOffset, sizeBarWidth, sizeBarHeight);


        // filling currentSizeBar

        // if player has reached max size
        if (players[i].maxSize === players[i].xSize){
            ctx.fillStyle = '#ba4340';

        }
        else {
            ctx.fillStyle = '#2f4fba';
        }
        ctx.fillRect(players[i].x - currentSizeBarXOffset, currentSizeBarYOffset,
            currentSizeBarWidth, currentSizeBarHeight);

        // filling percentage?


        for (let upgrade in players[i].upgrades){
        }
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

    // score display
    ctx.fillStyle = '#73b979';
    ctx.font = '30px Arial';
    ctx.fillText("Score: "+  self.score.toString(), 80, 50);

    // reverting font back to default
    ctx.font = '12px sans-serif';

}