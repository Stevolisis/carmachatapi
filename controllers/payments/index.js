const Services = require("../../models/serviceSchema");
const Mservice = require("../../utils/micro_functions");

exports.confirmPayment=async (req,res)=>{
    try{
        const { session_id } = req.fields;
        const id = req.user.id;
        
        const session_info = Mservice.getPaymentStatus(session_id);
        if(session_info){
            res.status(200).json({status:'success'}); 
            // if (session_info.payment_status === 'paid') {
            //     // Update your database with the payment success status
            //     // ...
          
            //     res.send('Payment successful. Thank you!');
            //   } else {
            //     // Payment not successful
            //     res.send('Payment not successful. Please try again.');
            //   }
        }else{
            res.status(500).json({status:'Payment Confirmation Fail'});  
        }

    }catch(err){
        console.log(err);
        res.status(500).json({status:err.message});  
    }
}

