// socket/handleSocketConnection.js
const { findOrCreateRoom } = require('../controllers/rooms');
const { handleGroupChat } = require('./handleGroupChat');

async function handleSocketConnection(socket, io) {
    const currentUser = socket.decoded;
    console.log("decodeddecoded: ",currentUser);
    let room;

    socket.on('join-room',async(args)=>{
        room = await findOrCreateRoom(args.target, currentUser.id);

        if (room) {
            socket.leave(room._id.toString());
            socket.join(room._id.toString());
            socket.emit("me",currentUser.id);
            io.to(room._id.toString()).emit('chats', room.chats);
            io.to(room._id.toString()).emit('room_users', room.participants);

            socket.on('group-chat',(msg)=>{
                const user = room.participants.find(user=>user._id == currentUser.id);
                console.log("decodeddecoded: ",currentUser.id,user);
                handleGroupChat(io,room,user,msg);
            });

        }

    });
}

module.exports = handleSocketConnection;
