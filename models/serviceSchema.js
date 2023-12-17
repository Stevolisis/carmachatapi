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
    pid:{
        type:mongoose.Schema.Types.ObjectId
        ,
        ref:'packages',
    },
    pricing:{
        type:Number,
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