import { io } from 'socket.io-client';

const webSocketURL = 'http://localhost:4000';
const socket = io(webSocketURL);

export default socket;