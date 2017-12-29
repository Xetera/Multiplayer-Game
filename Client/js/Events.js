let events = {}; // cleaning up namespace


events.emitKeyPress = function(pack){
    socket.emit('keyPress', pack)
};


events.emitNewNick = function(pack){
    socket.emit('newNick', pack)
};

events.emitNewMessage = function(message){
    socket.emit('newMessage', message);
};


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