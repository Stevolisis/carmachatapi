const Users = require("\../../models/userSchema");
const Mservice = require('../../utils/micro_functions')

exports.register=async (req,res)=>{
    
    try{
        const {full_name,email,password}=req.fields;
        const user_exist=await Users.findOne({email:email});
        if(user_exist){
            res.status(404).json({status:'User with this email exist'});
            return;
        }
        const date=new Date();
        const hashed_password = await Mservice.hashPassword(password);

        const user_scheme = new Users({
            full_name:full_name,
            email:email,
            password:hashed_password,
            status:'active',
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        });
        await user_scheme.save();
        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }
}



exports.login=async (req,res)=>{

    try{
        const checking=await Users.findOne({email:req.fields.email,status:'active'});
        if(checking===null){
            res.status(404).json({status:'Invalid Credentials'});
            return;
        }
        const checkPassword=await Mservice.validatePassword(req.fields.password, checking.password);
        if(!checkPassword) {
            res.status(404).json({status:'Invalid Credentials'});
            return;
        }
        
        const token=Mservice.generateToken(checking._id,60 * 60 * 24 * 30);
        
        res.status(202).json({status:'success',data:{token:token}});

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error'});
    }

}