const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const sql = require('mssql');
const port = 3000;

app.use(express.json());

const connection = require('./connections');

require('./globalChat')(io); // load globalChat.js and pass it the socket.io object

require('./loginAndRegister')(app, sql, connection.config); // load loginAndRegister.js and pass it the app, sql and sql config objects

require('./main')(app, sql, connection.config);// load main.js and pass it the app, sql and sql config objects

server.listen(port, () => console.log(`Listening on port ${port}...`));