const Rooms = require("../../models/roomSchema");

exports.registerRoom=async ({participants})=>{

    try{
        const room_schema = new Rooms({
            participants:[participants[0],participants[1]]
        });
        const room = await room_schema.save();
        return room;
    }catch(err){
        console.log(err);
        return false
    }
    
}