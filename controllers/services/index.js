const Services = require("../../models/serviceSchema");

exports.addService=async (req,res)=>{
    try{
        const { name, package, pricing, details} = req.fields;
        const sid = req.user.id;
        
        const newService = new Services({
            sid:sid,
            name:name,
            pid:package.split("-")[0],
            pricing:pricing,
            details:details,
        })
        const serviceSave = await newService.save();
        if(serviceSave){
            res.status(200).json({status:'success'});  
        }else{
            res.status(404).json({status:'Error in saving'});  
        }

    }catch(err){
        console.log(err);
        res.status(500).json({status:err.message});  
    }
}




exports.getServices=async (req,res)=>{

    try{
        const services=await Services.find({}).populate("sid pid");
        res.status(200).json({status:'success',data:services});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.getService=async (req,res)=>{

    try{
        const { id }=req.params;
        const service=await Services.findOne({_id:id}).populate("sid pid");
        res.status(200).json({status:'success',data:service});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.editService=async (req,res)=>{

    try{
        const { name, package, pricing, details} = req.fields;
        const editService=await Services.updateOne({_id:id},{$set:{
            name:name,
            pid:package,
            pricing:pricing,
            details:details,
        }});
        if(editService){
            res.status(200).json({status:'success'});
        }else{
            res.status(404).json({status:'error in update'});
        }
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}