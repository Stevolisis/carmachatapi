const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'users',
    },
    bid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'bookings',
    },
    pid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'packages',
    },
    session_id:{
        type:String,
        required: [true, "Session Id field required"]
    },
    amount_subtotal:{
        type:Number,
        required: [true, "Amount field required"]
    },
    amount_total:{
        type:Number,
        required: [true, "Amount field required"]
    },
    payment_method:{
        type:String,
        required: [true, "Payment Method field required"]
    },
    package:{
        type:String,
    },
    stripe_product_id:{
        type:String,
    },
    payment_status:{
        type:String,
        required: [true, "Payment Status field required"]
    },
    time_of_transaction:{
        type:String,
        required: [true, "Time Of Transaction field required"]
    },
},
{
    timestamps:true
}
);

//---------------------------------------------------
module.exports=mongoose.model('payments',paymentSchema);