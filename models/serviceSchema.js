const mongoose=require('mongoose');

const serviceSchema=new mongoose.Schema({
    sid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'staffs',
    },
    name:{
        type:String,
        required: [true, "Name field required"]
    },
    package:{
        type:String,
        required: [true, "Package field required"]
    },
    pricing:{
        type:Number,
        required: [false, "Pricing field required"]
    },
    details:{
        type:String,
        required: [true, "Details field required"]
    },
},
{
    timestamps:true
}
);

//---------------------------------------------------
module.exports=mongoose.model('services',serviceSchema);