// define constructor function that gets `io` send to it
module.exports = (io) => {
    io.on('connection', socket => {
        console.log('a user connected');

        socket.on('chat message', msg => {
            console.log(msg);
            io.emit('chat message', msg);
        });
    })
}