var express=require('express');
const router=express.Router();
const { register, login, staffRegister, staffLogin } = require('../controllers/auth');


router.post('/register',register,staffRegister);
router.post('/login',login,staffLogin);

module.exports=router;