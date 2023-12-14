const mongoose=require('mongoose');

const ticketSchema=new mongoose.Schema({
    ticket_number:{
        type:String,
        required: [true, "Description field required"]
    },
    subject:{
        type:String,
        required: [true, "Subject field required"]
    },
    category:{
        type:String,
        required: [true, "Category field required"]
    },
    priority:{
        type:String,
        required: [true, "Priority field required"]
    },
    description:{
        type:String,
        required: [true, "Description field required"]
    },
    attachments:[{
        public_id:String,
        url:String
    }],
    replies:[{
        sid:{
            type:mongoose.Schema.Types.ObjectId
            ,
            ref:'staffs',
        },
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
        required: [true, "Status field required"]
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
module.exports=mongoose.model('tickets',ticketSchema);