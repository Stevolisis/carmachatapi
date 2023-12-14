var express=require('express');
const { getAllTickets, getTickets, addTicket, getTicket } = require('../controllers/tickets');
const { verifyUser } = require('../middleware/verifyUser');
const router=express.Router();


router.get('/getAllTickets',verifyUser,getAllTickets);
router.get('/getTickets',verifyUser,getTickets);
router.get('/getTicket/:id',verifyUser,getTicket);
router.post('/addTicket',verifyUser,addTicket);

module.exports=router;