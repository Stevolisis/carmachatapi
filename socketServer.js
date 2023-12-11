const socketIo = require('socket.io');
const { registerRoom } = require('./controllers/rooms');
const authSocket = require('./middleware/authSocket');
const Room = require('./models/roomSchema');

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

        socket.on('join-room',async(args)=>{
            const currentUser = socket.decoded;
            const room = await Room.findOne({participants:{$all:[args.target,currentUser.id]}});
            console.log('room: ',room);
            if(room){
                socket.join(room._id);
                io.to(room._id).emit('chats',room.chats);
            }else{
                const room = await registerRoom([args.target,currentUser.id]);
                console.log('room22222: ',room);

                if(room){
                    socket.join(room._id);
                    io.to(room._id).emit('chats',room.chats);
                }
            }
        });
    });

    return io;
}

module.exports = initializeSocket;