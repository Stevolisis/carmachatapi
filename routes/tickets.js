var express=require('express');
const { getAllTickets, getTickets, addTicket, getTicket, updateTicketStatus } = require('../controllers/tickets');
const { verifyUser } = require('../middleware/verifyUser');
const router=express.Router();


router.get('/getAllTickets',verifyUser,getAllTickets);
router.get('/getTickets',verifyUser,getTickets);
router.get('/getTicket/:id',verifyUser,getTicket);
router.post('/addTicket',verifyUser,addTicket);
router.patch('/ticket_status/:id',verifyUser,updateTicketStatus);

module.exports=router;