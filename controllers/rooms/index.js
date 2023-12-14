const Rooms = require('../../models/roomSchema');


function areParticipantsValid(room, currentUserId, targetUserId) {
    console.log("Array.isArray(room.participants): ",room);
    if (room && Array.isArray(room.participants)) {
      // Check if the participants array has exactly two elements
      if (room.participants.length === 2) {
        // Check if the participants array contains only currentUserId and targetUserId
        const participantIds = room.participants.map(participant => participant._id.toString());
        console.log("participantIds: ",participantIds,currentUserId,targetUserId);
        console.log('parrrrrrrtValiiiiid: ',participantIds[0]===currentUserId.toString() && participantIds[1]===targetUserId.toString()||participantIds[1]===currentUserId.toString() && participantIds[0]===targetUserId.toString());
        return participantIds[0]===currentUserId.toString() && participantIds[1]===targetUserId.toString()  ||  participantIds[1]===currentUserId.toString() && participantIds[0]===targetUserId.toString();
      }
    }
  
    return false;
  }

async function findOrCreateRoom(targetUserId, currentUserId) {

    try{

        const room = await Rooms.findOne({ participants: { $all: [targetUserId, currentUserId] } }).populate('participants');

        if (room && areParticipantsValid(room, targetUserId, currentUserId)) {

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

        if (room2 && areParticipantsValid(room2, targetUserId, currentUserId)) {
            return room2;
        }

    }catch(err){
        throw new Error(err.message);
    }
}

async function addChat(room,user,msg,time) {
    console.log(room._id);
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
