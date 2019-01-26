import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001/');


function sendOrders(incomingData) {
    socket.emit('new-order', incomingData);
}

export { sendOrders };