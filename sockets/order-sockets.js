module.exports = function(io){
    console.log('running');
    io.on('connection', function(socket) {
      
        socket.on('new-order', function(data){
            console.log(data);
             io.emit('new-order', data);
        })


    });
}