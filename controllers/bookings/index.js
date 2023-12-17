const Bookings = require("../../models/bookingSchema");
const Users = require("../../models/userSchema");
const Mservice = require("../../utils/micro_functions");

exports.addBooking=async (req,res)=>{
    try{
        const { service } = req.fields;
        const uid = req.user.id;
        const user = Users.findOne({_id:uid});

        if(user){
            if(service.pid.name === "basic"){

                const newBooking = new Bookings({
                    uid:uid,
                    sid:service.sid._id,
                    svid:service._id,
                    package:service.pid.name,
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
                console.log("111111111")
                if(user.package === service.pid.name){
                    console.log("222222222222222")
                    const newBooking = new Bookings({
                        uid:uid,
                        sid:service.sid._id,
                        svid:service._id,
                        package:service.pid.name,
                        complete:true
                    })
                    const saveBooking = await newBooking.save();

                    if(saveBooking){
                       res.status(200).json({status:'success'});
                    }else{
                        res.status(500).json({status:'error occured while saving booking2'});
                    }
                }else{
                    console.log("3333333333333")
                    res.status(401).json({status:'unauthorized',data:"You have not subscribed to this package"});
                }
            }
        }else{
            res.status(500).json({status:'error',data:"User not found"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({status:"error",data:err.message});
    }
}




exports.getUserBookings=async (req,res)=>{

    try{
        const { id } = req.user;
        const bookings=await Bookings.find({uid:id}).populate("uid sid svid");
        res.status(200).json({status:'success',data:bookings});

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}

exports.getStaffBookings=async (req,res)=>{

    try{
        const { id } = req.user;
        const bookings=await Bookings.find({sid:id}).populate("uid sid svid");
        res.status(200).json({status:'success',data:bookings});

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


exports.getBooking=async (req,res)=>{

    try{
        const { id }=req.params;
        const booking=await Bookings.findOne({_id:id}).populate("uid sid svid");
        res.status(200).json({status:'success',data:booking});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}


// exports.cancelBooking=async (req,res)=>{

//     try{
//         const { id } = req.params;
//         const editService=await Bookings.deleteOne({_id:id});
//         // refund user not implemented yet
//         if(editService){
//             res.status(200).json({status:'success'});
//         }else{
//             res.status(404).json({status:'error in delete'});
//         }
//     }catch(err){
//         console.log(err);
//         res.status(404).json({status:'error', data:err.message});
//     }

// }