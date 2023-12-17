const mongoose=require('mongoose');

const packageSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Name field required"]
    },
    type:{
        type:String,
        required: [true, "Type field required"]
    },
    pricing:{
        type:Number,
    },
    description:{
        type:String,
        required: [true, "Description field required"]
    },
},
{
    timestamps:true
}
);

//---------------------------------------------------
module.exports=mongoose.model('packages',packageSchema);