const Rooms = require('../../models/roomSchema');


function areParticipantsValid(room, currentUserId, targetUserId) {
    if (room && Array.isArray(room.participants)) {
      // Check if the participants array has exactly two elements
      if (room.participants.length === 2) {
        // Check if the participants array contains only currentUserId and targetUserId
        const participantIds = room.participants.map(participant => participant._id.toString());
        return participantIds.includes(currentUserId.toString()) && participantIds.includes(targetUserId.toString());
      }
    }
  
    return false;
  }

async function findOrCreateRoom(targetUserId, currentUserId) {

    try{

        const room = await Rooms.findOne({ participants: { $all: [targetUserId, currentUserId] } }).populate('participants');

        if (room && areParticipantsValid(room, targetUserId, currentUserId)) {
            console.log(room);
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
