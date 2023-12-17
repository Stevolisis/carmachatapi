const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'users',
    },
    sid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'staffs',
    },
    svid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'services',
    },
    package:{
        type:String,
        required: [true, "Package field required"]
    },
    session_id:{
        type:String,
    },
    complete:{
        type:Boolean,
        required: [true, "Booking field required"]
    },
},
{
    timestamps:true
}
);

//---------------------------------------------------
module.exports=mongoose.model('bookings',bookingSchema);