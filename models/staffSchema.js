const mongoose=require('mongoose');

const staffSchema=new mongoose.Schema({
    full_name:{
        type:String,
        required: [true, "Please enter your name"]
    },
    email:{
        type:String,
        required: [true, "Please enter your email"]
    },
    password:{
        type:String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password must be at least 8 characters"],
    },
    status:{
        type:String,
        required: [true, "status field required"]
    },
    day:{
        type:String,
        required: [true, "day field required"],
        immutable:true
    },
    month:{
        type:String,
        required: [true, "month field required"],
        immutable:true
    },
    year:{
        type:String,
        required: [true, "year field required"],
        immutable:true
    },
    created_at:{
        type:Date,
        default:()=>Date.now(),
        required: [true, "created_at field required"],
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:()=>Date.now(),
        required: [true, "updatedAt field required"],
    } 
})

//---------------------------------------------------
module.exports=mongoose.model('staffs',staffSchema);