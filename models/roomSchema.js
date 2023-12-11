const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId
         ,
        ref:'users',
        required:true
    }],
    chats:[{
        sid:String,
        uid:{
            type:mongoose.Schema.Types.ObjectId
            ,
            ref:'users',
        },
        userName:{
            type:String,
        },
        text:{
            type:String,
        },
        time:{
            type:Date,
            default:()=>Date.now(),
        }
    }],
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
module.exports=mongoose.model('rooms',roomSchema);