var express=require('express');
const { addBooking, getStaffBookings, getUserBookings, getBooking } = require('../controllers/bookings');
const { verifyUser } = require('../middleware/verifyUser');
const router=express.Router();


router.post('/addBooking',verifyUser,addBooking);
router.get('/getStaffBookings',verifyUser,getStaffBookings);
router.get('/getUserBookings',verifyUser,getUserBookings);
router.get('/getBooking/:id',verifyUser,getBooking);

module.exports=router;