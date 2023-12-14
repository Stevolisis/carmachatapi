// socket/handleSocketConnection.js
const { findOrCreateRoom } = require('../controllers/rooms');
const Room = require('../models/roomSchema');
const { handleGroupChat } = require('./handleGroupChat');

async function handleSocketConnection(socket, io) {
    const currentUser = socket.decoded;
    socket.emit("me",currentUser.id);

    socket.on('join-room',async(args)=>{
        const room = await findOrCreateRoom(args.target, currentUser.id);

        if (room) {
            socket.join(room._id.toString());
            io.to(room._id.toString()).emit('chats', room.chats);
            io.to(room._id.toString()).emit('room_users', room.participants);

            socket.on('group-chat',(msg)=>{
                const user = room.participants.find(user=>user._id == currentUser.id);
                console.log('qqqqqqqqqqqqqqqqq',user);
                handleGroupChat(io,room,user,msg);
            });
        }
    });
}

module.exports = handleSocketConnection;
