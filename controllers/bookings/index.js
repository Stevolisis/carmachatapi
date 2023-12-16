const Bookings = require("../../models/bookingSchema");
const Mservice = require("../../utils/micro_functions");

exports.addBooking=async (req,res)=>{
    try{
        const { sid, uid, service, package } = req.fields;
        if(package === "basic"){
            const payStripe = Mservice.generatePaymentLink(service,user,sid);
            console.log("payStripepayStripe: ",payStripe)
            res.status(200).json({status:'success',link:payStripe});
        }else{

        }

        if(serviceSave){
            res.status(200).json({status:'success'});  
        }else{
            res.status(404).json({status:'Error in saving'});  
        }

    }catch(err){
        throw new Error(err.message);
    }
}




exports.getBookings=async (req,res)=>{

    try{
        const services=await Bookings.find({});
        res.status(200).json({status:'success',data:services});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.getService=async (req,res)=>{

    try{
        const { id }=req.params;
        const service=await Bookings.findOne({_id:id});
        res.status(200).json({status:'success',data:service});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.editService=async (req,res)=>{

    try{
        const { name, package, pricing, details} = req.fields;
        const editService=await Bookings.updateOne({_id:id},{$set:{
            name:name,
            package:package,
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