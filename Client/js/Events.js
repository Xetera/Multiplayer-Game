let events = {}; // cleaning up namespace


events.emitKeyPress = function(pack){
    socket.emit('keyPress', pack)
};



socket.on('update', (pack)=> {
    updateDisplay(pack);
});