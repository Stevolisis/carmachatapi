var express=require('express');
const { confirmPayment } = require('../controllers/payments');
const { verifyUser } = require('../middleware/verifyUser');
const router=express.Router();


router.post('/confirmPayment',verifyUser,confirmPayment);

module.exports=router;