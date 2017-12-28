let events = {}; // cleaning up namespace


events.emitKeyPress = function(pack){
    socket.emit('keyPress', pack)
};



socket.on('players', (pack)=> {
    players = pack;
});

socket.on('food', (pack) => {
    foods = pack;
});

socket.on('draw', ()=>{
    updateDisplay();
});