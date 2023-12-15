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
        const ticket=await Tickets.findOne({_id:id}).populate("creator");
        res.status(200).json({status:'success',data:ticket});
    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}

exports.addTicket=async (req,res)=>{
    console.log("add_tickets Fields: ",req.fields);
    try{
        const imagetoUpload=[];
        const { subject,category,priority,description }=req.fields;
        const date=new Date();

        if(!Array.isArray(req.files.attachments)){
            if(req.files.attachments.size !== 0){
               imagetoUpload.push(req.files.attachments); 
            };
            
        } else{
            let attachmentsIn=req.files.attachments;
            attachmentsIn.forEach(slider=>{
                imagetoUpload.push(slider);
            })
        }
        const user = await Users.findOne({_id:req.user.id});
        console.log("oouuuuuuuuuuussssssssser: ",user);
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

        await ticketSave.save()
        const mail= await Mservice.sendMail("support",`[Ticket ID: ${ticketSave._id}] ${subject}`,"stevolisisjosephpur@gmail.com",{
            name:user.full_name,
            ticket:{
                subject: subject,
                status: "Open",
                priority: priority
            }
        });
        console.log("mmmmmmmail: ",mail);
        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error'});
    }

}


exports.updateTicketStatus=async (req,res)=>{

    try{
        const { id } = req.params;
        console.log("uuuuuupdte: ",id,req.user);
        if(req.fields.status === "In Progress"){
            const ticketUpdate=await Tickets.updateOne({_id:id},{$set:{
                status:req.fields.status,
                staff:req.user.id,
                update_at:new Date().toISOString()
            }});
            console.log(ticketUpdate)
            if(ticketUpdate) res.status(200).json({status:'success'});            
        }else{
            const ticketUpdate=await Tickets.updateOne({_id:id},{$set:{
                status:req.fields.status,
                update_at:new Date().toISOString()
            }});
            console.log(ticketUpdate)
            if(ticketUpdate) res.status(200).json({status:'success'});   
    }

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}