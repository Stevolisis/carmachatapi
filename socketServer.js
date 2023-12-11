const socketIo = require('socket.io');
const { registerRoom } = require('./controllers/rooms');
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
        socket.emit("me",socket.id);

        socket.on('join-room',(args)=>{
            const currentUser = args.decoded;
            console.log(registerRoom(socket.id,[args.user,currentUser.id]));
        });
    });

    return io;
}

module.exports = initializeSocket;