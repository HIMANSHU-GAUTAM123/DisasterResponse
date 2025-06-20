import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
let socket;

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
} 