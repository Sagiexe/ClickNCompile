const socket = io('http://localhost:3000'); // Replace with your public IP/domain for remote play
const roomName = sessionStorage.getItem('room') || 'default-room';