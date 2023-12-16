const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'users',
    },
    transaction_id:{
        type:String,
        required: [true, "Transaction Id field required"]
    },
    amount:{
        type:Number,
        required: [true, "Amount field required"]
    },
    package:{
        type:String,
        required: [true, "package field required"]
    },
    confirmed:{
        type:Boolean,
        required: [true, "Confirmed field required"]
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
module.exports=mongoose.model('payments',paymentsSchema);const mongoose=require('mongoose');