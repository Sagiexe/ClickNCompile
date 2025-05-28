import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
cors: {origin: '*'}
});

const room = {};

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join', (roomName) => {
    socket.join(roomName);
    const clients = Array.from(io.sockets.adapter.rooms.get(roomName) || []);
    const otherClient = clients.find(id => id !== socket.id);

    if (otherClient) {
      socket.emit('ready', { peerId: otherClient });
      io.to(otherClient).emit('ready', { peerId: socket.id });
    }
  });

  socket.on('signal', ({ to, from, data }) => {
    io.to(to).emit('signal', { from, data });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Signaling server running on http://localhost:3000');
});