const Users = require("\../../models/userSchema");

exports.getUsers=async (req,res)=>{

    try{
        const verifiedUserId = req.user.id;
        const users=await Users.find({ _id: { $ne: verifiedUserId } });
        res.status(200).json({status:'success',data:users});

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}