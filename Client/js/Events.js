let events = {}; // cleaning up namespace


events.emitKeyPress = function(pack){
    socket.emit('keyPress', pack)
};


events.emitNewNick = function(pack){
    socket.emit('newNick', pack)
};

events.emitNewMessage = function(pack){
    console.log(pack);
    socket.emit('newMessage', pack);
};

socket.on('newMessage', (pack)=>{
    console.log(pack);
    let nick;
    let userImage = './Media/blue-cube.png';
    if (pack.user){
        nick = pack.nick
    }
    else {
        nick = "SERVER"
    }
    let element =
        `<div class="chat-text soft-container">
            <div class="icon-container">
                <img src="${userImage}"  class="chat-icon">
                <br/>
                <div>[${nick}]</div>
            </div>
            <p class="user-message">${pack.msg}</p>
        </div>`;
    chatBox.append(element);
});

socket.on('players', (pack)=> {
    players = pack;
    if (!self){
    }
});

socket.on('food', (pack) => {
    foods = pack;
});

socket.on('potions', (pack)=>{
    potions = pack;
});

socket.on('draw', ()=>{
    updateDisplay();
});