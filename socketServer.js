const socketIo = require('socket.io');
const handleSocketConnection = require('./handlers/handleSocketConnection');
const authSocket = require('./middleware/authSocket');

function initializeSocket(server) {

    const io = socketIo(server,{
        cors: {
            origin: process.env.PORT,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.use(authSocket).on('connection', (socket) => {
        handleSocketConnection(socket,io);
    });

    return io;
}

module.exports = initializeSocket;