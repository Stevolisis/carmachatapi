var express=require('express');
const { subscribeToPackage, addPackage, getPackages, getPackage } = require('../controllers/package');
const { verifyUser } = require('../middleware/verifyUser');
const router=express.Router();


router.post('/addPackage',verifyUser,addPackage);
router.get('/getPackages',verifyUser,getPackages);
router.get('/getPackage/:id',verifyUser,getPackage);
router.post('/subscribeToPackage',verifyUser,subscribeToPackage);

module.exports=router;