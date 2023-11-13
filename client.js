// client.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        io.to(data.room).emit('chat message', data);  // Change io.emit to io.to(room)
      });
    
      // Add the following event handler for joining rooms
      socket.on('join room', (room) => {
        socket.join(room);
      });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
