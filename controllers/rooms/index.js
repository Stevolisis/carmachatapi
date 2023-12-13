const Rooms = require('../../models/roomSchema');

async function findOrCreateRoom(targetUserId, currentUserId) {
    try{
        const room = await Rooms.findOne({ participants: { $all: [targetUserId, currentUserId] } }).populate('participants');
        if (room) {
            // console.log("rooooooom1: ",room);
            return room;
        }
        const date=new Date();
        const room_schema = new Rooms({
            participants:[targetUserId,currentUserId],
            status:'active',
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        });
        await room_schema.save();
        const room2 = await Rooms.findOne({ participants: { $all: [targetUserId, currentUserId] } }).populate('participants');
        // console.log("rooooooom2: ",room2);
        return room2;
    }catch(err){
        throw new Error(err.message);
    }
}

async function addChat(room,user,msg,time) {
    try{
        const newMsg = {
            uid:user._id,
            userName:user.full_name,
            text:msg,
            time:time
        }
        await Rooms.updateOne({_id:room._id},{$push:{chats:newMsg}});
        return true

    }catch(err){
        throw new Error(err.message);
    }
}

module.exports = { findOrCreateRoom, addChat };
