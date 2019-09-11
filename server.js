const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    const userConnectInfo = 'user connected, socket id: ' + socket.id;
    // tell them all we have new connected user
    io.emit('user_connection', userConnectInfo);

    // listen from clients and get msg
    socket.on('chat message', (msg) => {
        // send a client message to everyone including clientself
        io.emit('chat message', msg);
    });

    // tell them all about disconnected user
    socket.on('disconnect', () => {
        const disconnectUser = 'user disconnected, socket id: ' + socket.id;
        io.emit('disconnect', disconnectUser);        
    });
});

http.listen(3000, () => {
    console.log('Listening on 3000');
});