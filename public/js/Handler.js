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