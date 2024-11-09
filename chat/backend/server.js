const {Server} = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app); //This line means that any HTTP reqs sent to this server will be handled by the express app.
//The server variable is also passed to the WebSocket server (wss), allowing WebSocket and HTTP traffic to share the same server instance and port.

const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

const connectedUsers = new Set();

io.on('connection', (socket) => {
    console.log('A user connected:',socket.id);
    connectedUsers.add(socket.id);

    socket.emit("yourId", socket.id);

    io.emit('connectedUsers', [...connectedUsers]);

    socket.on('message', (message) => {
        console.log('Message:',message);
        const messageData = {
            senderId: socket.id,
            text: message
        }
        io.emit('message', messageData);
    })


    socket.on('disconnect', () => {
        console.log('User disconnected:',socket.id);
        connectedUsers.delete(socket.id);
        io.emit('connectedUsers', [...connectedUsers]);
    })
})  

app.use(express.json());

server.listen(8000, () => {
    console.log('Server started on http://localhost:8000');
})