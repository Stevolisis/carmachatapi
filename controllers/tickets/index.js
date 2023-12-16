const Tickets = require("../../models/ticketSchema");
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
        const ticket=await Tickets.findOne({_id:id}).populate("creator staff replies.sid replies.uid");
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
        const ticket=await Tickets.findOne({_id:id}).populate("creator");

        if(req.fields.status === "In Progress"){
            const ticketUpdate=await Tickets.updateOne({_id:id},{$set:{
                status:req.fields.status,
                staff:req.user.id,
                updateAt:new Date().toISOString()
            }});
            console.log(ticketUpdate)
            if(ticketUpdate) res.status(200).json({status:'success'});            
        }else{
            const ticketUpdate=await Tickets.updateOne({_id:id},{$set:{
                status:req.fields.status,
                updateAt:new Date().toISOString()
            }});
            const mail = await Mservice.sendMail("ticket_update",`Update on [Ticket ID: ${ticket._id}] ${ticket.subject}`,"stevolisisjosephpur@gmail.com",{
                name:ticket.creator.full_name,
                link:`http://localhost:3000/ticket_info2/${id}`,
                message:`Your Ticket has been ${req.fields.status}`,
                ticket:{
                    subject: ticket.subject,
                    status: req.fields.status,
                    priority: ticket.priority
                }
            });
            console.log(ticketUpdate&&mail)
            if(ticketUpdate && mail) res.status(200).json({status:'success'});   
    }

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }

}



exports.replyTicket=async (req,res)=>{

    try{
        const { id,from } = req.params;
        const ticket=await Tickets.findOne({_id:id}).populate("creator");
        const user = from === "staff" && await Users.findOne({_id:req.fields.user});
        const newReply = {
            sid: from==="staff" ? req.user.id : req.fields.user,
            uid: from==="staff" ? req.fields.user : req.user.id,
            from: from,
            text:req.fields.msg,
            time:new Date().toISOString()
        }
        await Tickets.updateOne({_id:id},{$set:{
            updateAt:new Date().toISOString()
        },$push:{
            replies:newReply
        }});
        
        if(from==="staff"){
            await Mservice.sendMail("ticket_update",`Update on [Ticket ID: ${ticket._id}] ${ticket.subject}`,"stevolisisjosephpur@gmail.com",{
                name:user.full_name,
                link:`http://localhost:3000/ticket_replies2/${id}`,
                message:req.fields.msg,
                ticket:{
                    subject: ticket.subject,
                    status: ticket.status,
                    priority: ticket.priority
                }
            });
        }else{
            await Mservice.sendMail("notify_staff_ticket_update",`Update on [Ticket ID: ${ticket._id}] ${ticket.subject}`,"stevolisisjoseph@gmail.com",{
                message:req.fields.msg,
                link:`http://localhost:3000/ticket_replies/${id}`,
                ticket:{
                    subject: ticket.subject,
                    status: ticket.status,
                    priority: ticket.priority
                }
            });
        }

        res.status(200).json({status:'success'}); 

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message}); 
    }
}
