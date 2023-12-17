const Bookings = require("../../models/bookingSchema");
const Users = require("../../models/userSchema");
const Mservice = require("../../utils/micro_functions");

exports.addBooking=async (req,res)=>{
    try{
        const { service } = req.fields;
        const uid = req.user.id;
        const user = Users.findOne({_id:uid});

        if(user){
            if(service.package === "basic"){

                const newBooking = new Bookings({
                    uid:uid,
                    sid:service.sid._id,
                    svid:service._id,
                    package:service.package,
                    complete:false
                })
                const saveBooking = await newBooking.save();
                console.log("saveBookingsaveBooking: ",saveBooking);

                if(saveBooking){
                    const payStripe = Mservice.generateOneTimePaymentLink(service,user,saveBooking);
                    console.log("payStripepayStripe: ",payStripe);
                    
                    if(payStripe){
                        res.status(200).json({status:'success',link:`https://checkout.stripe.com/pay/${payStripe.id}`});
                    }else{
                        res.status(500).json({status:'error occured while generating payment link'});
                    }

                }else{
                    res.status(500).json({status:'error occured while saving booking'});
                }

            }else{
                if(user.package === service.package){
                    const newBooking = new Bookings({
                        uid:uid,
                        sid:service.sid._id,
                        svid:service._id,
                        package:service.package,
                        complete:true
                    })
                    const saveBooking = await newBooking.save();

                    if(saveBooking){
                       res.status(200).json({status:'success'});
                    }else{
                        res.status(500).json({status:'error occured while saving booking2'});
                    }
                }else{
                    res.status(200).json({status:'unauthorized',data:"You have not subscribed to this package"});
                }
            }
        }else{
            res.status(500).json({status:'error',data:"User not found"});
        }

        if(serviceSave){
            res.status(200).json({status:'success'});  
        }else{
            res.status(500).json({status:'Error in saving'});  
        }

    }catch(err){
        throw new Error(err.message);
    }
}




exports.getBookings=async (req,res)=>{

    try{
        const services=await Bookings.find({}).populate("uid sid svid");
        res.status(200).json({status:'success',data:services});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.getService=async (req,res)=>{

    try{
        const { id }=req.params;
        const service=await Bookings.findOne({_id:id}).populate("uid sid svid");
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