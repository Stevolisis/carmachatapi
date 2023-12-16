const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'users',
    },
    svid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'services',
    },
    package:{
        type:Number,
        required: [true, "Pricing field required"]
    },
},
{
    timestamps:true
}
);

//---------------------------------------------------
module.exports=mongoose.model('bookings',bookingSchema);