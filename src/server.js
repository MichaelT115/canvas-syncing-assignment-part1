const socketio = require('socket.io');

const httpHandler = require('./httpHandler');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const server = httpHandler.CreateServer(PORT);

const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
  console.log('IO Socket Started');

  let x = 0;

  const sendMessage = () => {
    x += 1;

    socket.emit('update', { message: x });
  };

  setInterval(sendMessage, 100);
});
