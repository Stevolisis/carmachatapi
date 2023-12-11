const Rooms = require("../../models/roomSchema");

exports.registerRoom=async (participants)=>{

    try{
        const date=new Date();
        const room_schema = new Rooms({
            participants:[participants[0],participants[1]],
            status:'active',
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        });
        const room = await room_schema.save();
        return room;
    }catch(err){
        console.log(err);
        return false
    }
    
}