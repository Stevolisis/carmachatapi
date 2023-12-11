const socketIo = require('socket.io');

function initializeSocket(server) {
    console.log('A user connected111111');
    const io = socketIo(server,{
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    console.log('A user connected222222222');
    io.on('connection', (socket) => {
        console.log('A user connected33333333');
        console.log('A user connected');
        socket.emit("me",socket.id);
    });

    return io;
}

module.exports = initializeSocket;