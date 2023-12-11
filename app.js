var express=require('express');
var app=express();
const mongoose=require('mongoose');
const cors=require("cors");
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const formidableMiddleware = require('express-formidable');
require('dotenv').config();

app.use(cors({
	origin:process.env.PORT,
	credentials:true
}));

app.use(formidableMiddleware({multiples: true}));

app.use('/auth',authRoute);
app.use('/users',userRoute);

//mongodb connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
  .then(() =>{
    app.listen(80,(err,res)=>{
        if(err){
            console.log('Error '+ err)
        }else{
            console.log('Connected Successfully')
        }
    });
}).catch(err=>{
    console.log(err.message);
});