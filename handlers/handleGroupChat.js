const { addChat } = require("../controllers/rooms");

async function handleGroupChat(io,room, user, msg) {
    const time = new Date().toISOString();
    const saveNewMsg = await addChat(room,user,msg,time);
    
    if(saveNewMsg){
        io.to(room._id.toString()).emit('message', {
            uid:user._id,
            userName:user.full_name,
            text:msg,
            time:time
       }); 
    }else{
        io.to(room._id).emit('message', {
            uid:user._id,
            userName:user.full_name,
            text:" ",
            time:time
        }); 
    }
}

module.exports = { handleGroupChat };