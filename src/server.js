const httpHandler = require('./httpHandler');
const ioHandler = require('./ioHandler');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

// Create HTTP server. Handles HTTP requests.
const server = httpHandler.CreateServer(PORT);

// Set IO Handler to listen to the server.
const io = ioHandler.CreateIO(server, (socket) => {
  // Handles when a message is received from a socket.
  socket.on('message', (data) => {
    io.emit('message', data); // Sends message to everyone
    socket.emit('serverMessage', { message: 'Message Sent' });  // Sends confirmation message to server.
  });
});
