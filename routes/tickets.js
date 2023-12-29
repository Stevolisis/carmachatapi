var express=require('express');
const { getAllTickets, getTickets, addTicket, getTicket, updateTicketStatus, replyTicket } = require('../controllers/tickets');
const { verifyUser } = require('../middleware/verifyUser');
const router=express.Router();


router.get('/getAllTickets',verifyUser,getAllTickets);//admin
router.get('/getTickets',verifyUser,getTickets);//of user using token
router.get('/getTicket/:id',verifyUser,getTicket);//of ticketId
router.post('/addTicket',verifyUser,addTicket);//user
router.patch('/ticket_status/:id',verifyUser,updateTicketStatus);//both
router.post('/reply_ticket/:id/:from',verifyUser,replyTicket);//both

module.exports=router;