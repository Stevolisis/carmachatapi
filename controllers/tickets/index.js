const Tickets = require("\../../models/ticketSchema");
const Users = require("../../models/userSchema");
const Mservice = require("../../utils/micro_functions");

exports.getAllTickets=async (req,res)=>{

    try{
        const ticket=await Tickets.find({});
        res.status(200).json({status:'success',data:ticket});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}

exports.getTickets=async (req,res)=>{

    try{
        const ticket=await Tickets.find({creator:req.user.id});
        res.status(200).json({status:'success',data:ticket});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}

exports.getTicket=async (req,res)=>{

    try{
        const { id }=req.params;
        const ticket=await Tickets.findOne({_id:id});
        res.status(200).json({status:'success',data:ticket});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}

exports.addTicket=async (req,res)=>{
    console.log("add_tickets Fields: ",req.fields)
    try{
        const imagetoUpload=[];
        const { subject,category,priority,description }=req.fields;
        const date=new Date();

        if(!Array.isArray(req.files.attachments)){
            imagetoUpload.push(req.files.attachments)
        } else{
            let attachmentsIn=req.files.attachments;
            attachmentsIn.forEach(slider=>{
                imagetoUpload.push(slider);
            })
        }
        const user = Users.findOne({_id:req.user.id});
        const fileSave=await Mservice.multimgUpload(imagetoUpload);
        const ticketSave=new Tickets({
            subject: subject,
            category: category,
            priority: priority,
            description: description,
            attachments:fileSave,
            replies:[],
            creator:req.user.id,
            status:"Open",
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        });

        await Promise.all([ticketSave.save(),Mservice.sendMail("support",`[Ticket ID: ${ticketSave._id}] ${subject}`,user.email,{
            name:user.full_name,
            ticket:{
                subject: subject,
                status: "Open",
                priority: priority
            }
        })]);
        res.status(200).json({status:'success'});
        
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error'});
    }

}