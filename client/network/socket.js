import { onSignalReceived, onReadyToConnect } from './peer-manager.js';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

let mySocketId = null;

socket.on('connect', () => {
  mySocketId = socket.id;
  socket.emit('join', 'default-room');
});

socket.on('signal', ({ from, data }) => {
  onSignalReceived(from, data); // Forward signal to peer manager
});

socket.on('ready', ({ peerId }) => {
  onReadyToConnect(peerId); // Trigger peer connection setup
});

export function sendSignal(to, data) {
  socket.emit('signal', {
    to,
    from: socket.id,
    data,
  });
}

export function getSocketId() {
  return mySocketId;
}