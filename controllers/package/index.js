const Packages = require("../../models/packageSchema");

exports.addPackage=async (req,res)=>{
    try{
        const { name, type, pricing, description} = req.fields;
        const newPackage = new Packages({
            name:name,
            type:type,
            pricing:pricing,
            description:description,
        })
        const packageSave = await newPackage();
        if(packageSave){
            res.status(200).json({status:'success'});  
        }else{
            res.status(404).json({status:'Error in saving'});  
        }

    }catch(err){
        throw new Error(err.message);
    }
}



exports.getPackages=async (req,res)=>{

    try{
        const packages=await Packages.find({});
        res.status(200).json({status:'success',data:packages});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.getPackage=async (req,res)=>{

    try{
        const { id }=req.params;
        const package=await Packages.findOne({_id:id});
        res.status(200).json({status:'success',data:package});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.editPackage=async (req,res)=>{

    try{
        const { charges,description }=req.fields;
        const editPackage=await Packages.updateOne({_id:id},{$set:{
            charges:charges,
            description:description
        }});
        if(editPackage){
            res.status(200).json({status:'success'});
        }else{
            res.status(404).json({status:'error in update'});
        }
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.subscribePackage=async (req,res)=>{

    try{
        const { charges,description }=req.fields;
        const editPackage=await Packages.updateOne({_id:id},{$set:{
            charges:charges,
            description:description
        }});
        if(editPackage){
            res.status(200).json({status:'success'});
        }else{
            res.status(404).json({status:'error in update'});
        }
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}