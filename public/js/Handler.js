const handler = {};
/**
 * Appends a new chat message on the chatbox
 *
 * @param {string} nick
 * @param {string} hasClass
 * @param {string} msg
 */
handler.appendMessage = function(nick, hasClass, msg){
    let userImage;
    if (hasClass === 'user-message'){
        userImage = './Media/blue-cube.png';
    }
    else if (hasClass === 'server-message') {
        userImage = './Media/Server.png'
    }

    let element =
        `<div class="chat-text chat-body">
            <div class="icon-container">
                <img src="${userImage}"  class="chat-icon">
                <br/>
                <div>[${nick}]</div>
            </div>
            <p class="${hasClass}">${msg}</p>
        </div>`;
    chatBox.append(element);

};

handler.appendOnlinePlayer = function(){

};


handler.keyDownEvent = function(event){
    // for some reason chat input selector needs an index for this
    if (document.activeElement === chatInput[0]){
        return
    }

    keyPresses.id = socket.id;
    if ((event.keyCode === 68 || event.keyCode === 39) &&
        (!keyPresses.keys.includes('right'))){   //d or right
        keyPresses.keys.push('right');
    }

    else if ((event.keyCode === 65 || event.keyCode === 37) &&
        (!keyPresses.keys.includes('left'))){ // a or left
        keyPresses.keys.push('left');
    }

    else if ((event.keyCode === 87 || event.keyCode === 38) &&
        (!keyPresses.keys.includes('up'))){ // w or up
        keyPresses.keys.push('up');
    }

    else if ((event.keyCode === 83 || event.keyCode === 40) &&
        (!keyPresses.keys.includes('down'))) {  //s or down
        keyPresses.keys.push('down');
    }
    else if (event.keyCode === 32){ // space
        //keyPresses.keys.push('space');
        return events.emitPlayerDash();
    }
    else if (event.keyCode === 13){
        $('#chat-input').focus();
        return;
    }
    else if (!allKeys.includes(event.keyCode)) {
        return;
    }
    console.log(keyPresses);

    events.emitKeyPress(keyPresses);
};

handler.keyUpEvent = function(event){

    if (keyPresses.keys.includes(keyCodes[event.keyCode])){
        // get the index of the keyPress and remove it from the array
        keyPresses.keys.splice(keyPresses.keys.indexOf(keyCodes[event.keyCode]), 1);

    }
    // making sure to resend updated information
    events.emitKeyPress(keyPresses);
};


//=======================================================
////////////////// PIXI //////////////////////////////
//=======================================================

handler.playerConnect = function(p){

    let connection = game.add.sprite(p.x, p.y, 'player');
    connection.id = p.id;
    connection.height = p.size;
    connection.width = p.size;
    connection.nick = p.defaultNick;
    players.push(connection);

    if (p.id === socket.id){
        // killing the load screen animation since this takes the longest
        //while (!loadComplete())
        loadComplete();
        player = connection;
    }


};

handler.playerUpdate = function(p){
    for (let i in players){
        for (let x in p){
            // copying the information into the array
            if (p[x].id === players[i].id) {
                players[i].x = p[x].x;
                players[i].y = p[x].y;
                players[i].width = p[x].size;
                players[i].height = p[x].size;

            }
            if (players[i].id === socket.id) {
                // centering the player in the middle of the screen, offsetting the size value
                // and accounting for the camera scale
                game.camera.focusOnXY(
                    game.world.scale.x * (players[i].x + 950/2 - (950 - players[i].width)/2),
                    game.world.scale.y * (players[i].y + 700/2 - (700 - players[i].height)/2)
                );
            }

        }
    }
    // camera debug information
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 650-32);
};

handler.playerDisconnect = function(player){
    // removing the player from the players array
    players.splice(players.indexOf(player), 1);
};

handler.foodUpdate = function(packet){
    for (let f in foods){
        for (let i in packet){
            console.log(packet);

            if (foods[f].id === packet[i].id){

                foods[f].x = packet[i].x;
                foods[f].y = packet[i].y;
                foods[f].width = packet[i].size;
                foods[f].height = packet[i].size;
                break
            }

            else if (i === packet.length){
                let food = game.add.sprite(packet[i].x, packet[i].y, 'food');
                foods[f].width = packet[i].size;
                foods[f].height = packet[i].size;
                foods.push(food);
            }
        }
    }
};
