var express=require('express');
const { getUsers } = require('../controllers/users');
const { verifyUser } = require('../middleware/verifyUser');
const router=express.Router();


router.get('/getUsers',verifyUser,getUsers);

module.exports=router;