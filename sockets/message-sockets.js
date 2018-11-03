module.exports = function(io) {
    io.on('connection', function(socket) {
        //Socket API Routes Backend
        socket.on('new-message', function(data){
            console.log(data);
            io.emit('emit-message', data);
        })
    })
}