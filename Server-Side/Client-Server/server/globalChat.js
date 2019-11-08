const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const port = 3001;

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('chat message', msg => {
        console.log(msg);
        socket.emit('chat message', msg);
    });
})

server.listen(port, () => console.log(`Listening on port ${port}...`));