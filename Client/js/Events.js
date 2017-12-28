// ==============================
// receiving packages
// ==============================
socket.on('positions', (players)=> {
    //console.log('new position');
    showAllPlayers(players);
});

socket.on('directionChange', (direction)=>{
    // direction -> [x, y]
    // s.dir accepts dir(x, y)
    //console.log(direction);
    let [x, y] = direction;
    s.dir(x, y);
});

socket.on('newPlayer', (obj) => {
    s = obj;
});

// ===================================
// sending packages
// ===================================
const emitDirection = function(keyCode){
    socket.emit('directionChange', keyCode);
};

const emitPlayerPackage = function(){
    socket.emit('update', s);
};

const emitNewPlayer = function() {
    socket.emit('newPlayer', null);
};