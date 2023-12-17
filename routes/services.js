var express=require('express');
const { addService, getServices, getService, editService } = require('../controllers/services');
const { verifyUser } = require('../middleware/verifyUser');
const router=express.Router();


router.post('/addService',verifyUser,addService);
router.patch('/editService/:id',verifyUser,editService);
router.get('/getServices',verifyUser,getServices);
router.get('/getService/:id',verifyUser,getService);

module.exports=router;