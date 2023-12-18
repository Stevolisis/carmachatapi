const Bookings = require("../../models/bookingSchema");
const Payments = require("../../models/paymentSchema");
const Packages = require("../../models/packageSchema");
const Users = require("../../models/userSchema");
const Mservice = require("../../utils/micro_functions");

exports.confirmPayment=async (req,res)=>{
    try{
        const { session_id } = req.fields;
        const id = req.user.id;
        
        const session_info = await Mservice.getPaymentStatus(session_id);
        if(session_info){
            const date = new Date(session_info.created * 1000);
            const formattedDate = date.toISOString();

            if (session_info.payment_status === 'paid') {
                const findPaymentWithSession = await Payments.findOne({session_id:session_info.id});

                if(session_info.metadata.bid){
                    console.log("22222222222222",findPaymentWithSession)
                    if(findPaymentWithSession){
                        res.status(200).json({status:"success",data:'Payment already verified. Thank you!'});
                    }else{
                        const newPayment=new Payments({
                            uid:id,
                            bid:session_info.metadata.bid,
                            session_id:session_info.id,
                            amount_subtotal:session_info.amount_subtotal/100,
                            amount_total:session_info.amount_total/100,
                            payment_method:session_info.payment_method_types[0],
                            payment_status:session_info.payment_status,
                            time_of_transaction:formattedDate,
                        });
                        
                        const updateBooking = Bookings.updateOne({_id:session_info.metadata.bid},{
                            $set:{complete:true,session_id:session_info.id}
                        });

                        await Promise.all([newPayment.save(),updateBooking])
                        .then(data=>{
                            res.status(200).json({status:"success",data:'Payment successful. Thank you!'});
                        });
                    }

                }else if(session_info.metadata.pid){
                    if(findPaymentWithSession){
                        res.status(200).json({status:"success",data:'Payment already verified. Thank you!'});
                    }else{
                        const pack = await Packages.findOne({_id:session_info.metadata.pid});
                        const newPayment=new Payments({
                            uid:id,
                            pid:session_info.metadata.pid,
                            session_id:session_info.id,
                            amount_subtotal:session_info.amount_subtotal/100,
                            amount_total:session_info.amount_total/100,
                            payment_method:session_info.payment_method_types[0],
                            package:pack.name,
                            stripe_product_id:session_info.metadata.stripe_product_id,
                            payment_status:session_info.payment_status,
                            time_of_transaction:formattedDate,
                        });
                        
                        const updateUser = Users.updateOne({_id:session_info.metadata.uid},{
                            $set:{package:pack?.name,stripe_product_id:session_info.metadata.stripe_product_id}
                        });

                        await Promise.all([newPayment.save(),updateUser])
                        .then(data=>{
                            res.status(200).json({status:"success",data:'Payment successful. Thank you!'});
                        });                        
                    }

                }else{
                    if(findPaymentWithSession){
                        res.status(200).json({status:"success",data:'Payment already verified. Thank you!'});
                    }else{
                        const newPayment=new Payments({
                            uid:id,
                            session_id:session_info.id,
                            amount_subtotal:session_info.amount_subtotal/100,
                            amount_total:session_info.amount_total/100,
                            payment_method:session_info.payment_method_types[0],
                            payment_status:session_info.payment_status,
                            time_of_transaction:formattedDate,
                        });
                        const paymentSave = await newPayment.save();
                        if(paymentSave){
                            res.status(404).json({status:"error",data:'Payment Transaction not recognised!'});
                        }else{
                            res.status(200).json({status:"success",data:'Error in payment saving'});
                        }                        
                    }

                }
              } else {
                    const newPayment=new Payments({
                        uid:id,
                        bid:session_info.metadata.bid,
                        session_id:session_info.id,
                        amount_subtotal:session_info.amount_subtotal/100,
                        amount_total:session_info.amount_total/100,
                        payment_method:session_info.payment_method_types[0],
                        payment_status:session_info.payment_status,
                        time_of_transaction:formattedDate,
                    });
                    const paymentSave = await newPayment.save();
                    if(paymentSave){
                        res.status(200).json({status:"success",data:'Payment not successful. Please try again.'});
                    }else{
                        res.status(200).json({status:"success",data:'Error in payment saving'});
                    }
              }
        }else{
            res.status(500).json({status:'Payment Confirmation Fail'});  
        }

    }catch(err){
        console.log(err);
        res.status(500).json({status:err.message});  
    }
}

