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

events.ping = function() {
    socket.emit('ping')
};

events.speedUpgrade = function(pack){
    socket.emit('speedUpgrade', pack)
};

socket.on('ping', (pack)=>{
    console.log(pack);
    let currentPing = Date.now() - ping;

    pack.msg= `[${pack.nick}] has ${currentPing} ms ping.`;
    socket.emit('newMessage', pack);
    ping = 0;
});

socket.on('newMessage', (pack)=>{
    console.log(pack);
    let nick;
    //TODO: Icons should be enums
    let userImage = './Media/blue-cube.png';
    let hasClass;
    if (pack.user){
        nick = pack.nick
    }
    else {
        nick = "SERVER"
    }
    if (pack.user){
        hasClass = 'user-message'
    }
    else {
        hasClass = 'server-message'
    }

    handler.appendMessage(nick, hasClass, pack.msg)

});

socket.on('upgradesInfo', (pack)=>{
    upgrades= pack;
});

socket.on('playerInfo', (pack)=> {
    players = pack;
    if (!self){
    }
});

socket.on('foodInfo', (pack) => {
    foods = pack;
});

socket.on('potionInfo', (pack)=>{
    potions = pack;
});

socket.on('draw', ()=>{
    updateDisplay();
});