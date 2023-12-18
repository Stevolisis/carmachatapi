const Packages = require("../../models/packageSchema");
const Users = require("../../models/userSchema");
const Mservice = require("../../utils/micro_functions");

exports.addPackage=async (req,res)=>{
    try{
        const { name, type, pricing, description} = req.fields;
        const newPackage = new Packages({
            name:name.toLowerCase(),
            type:type,
            pricing:pricing,
            description:description,
        })
        const packageSave = await newPackage.save();
        if(packageSave){
            res.status(200).json({status:'success'});  
        }else{
            res.status(404).json({status:'Error in saving'});  
        }

    }catch(err){
        res.status(500).json({status:err.message});  
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
        const { id } = req.params;
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


exports.subscribeToPackage=async (req,res)=>{

    try{
        const { package }=req.fields;
        const uid = req.user.id;
        const user = await Users.findOne({_id:uid});
        const findPackage = await Packages.findOne({name:package});

        if(findPackage){
            if(user.package === package){
                res.status(200).json({status:'Package already registered by you'});
            }else{
                const payStripe = await Mservice.generateSubscriptionPaymentLink(user,findPackage);
                console.log("payStripepayStripeSUbSubSub: ",payStripe);
                
                if(payStripe){
                    res.status(200).json({status:'success',data:payStripe.url});
                }else{
                    res.status(500).json({status:'error occured while generating payment link'});
                }
            }
        }else{
            res.status(200).json({status:'error',data:"Package does not exist"});
        }

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}