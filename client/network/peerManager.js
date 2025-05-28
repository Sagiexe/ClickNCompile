import Peer from 'simple-peer';
import { sendSignal, getSocketId } from './socket.js';
import { handlePeerClick } from '../game/clickManager.js';

let peer;

export function onReadyToConnect(peerId) {
  const initiator = getSocketId() < peerId; 
  peer = new Peer({ initiator, trickle: false });

  peer.on('signal', data => {
    sendSignal(peerId, data);
  });

  peer.on('connect', () => {
    console.log('Peer connection established!');
  });

  peer.on('data', data => {
    const message = JSON.parse(data);

    if (message.type === 'click') {
      handlePeerClick(message.count);
    }
  });
}

export function onSignalReceived(from, data) {
  if (peer) {
    peer.signal(data);
  }
}

export function sendGameData(data) {
  if (peer && peer.connected) {
    peer.send(JSON.stringify(data));
  }
}