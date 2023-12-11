var express=require('express');
var app=express();
const mongoose=require('mongoose');
const cors=require("cors");
const http=require('http');
const socketApi = require('./socketServer');
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const formidableMiddleware = require('express-formidable');
const { Server } = require('socket.io');
require('dotenv').config();
//socket server
const server=http.createServer(app);
const io = socketApi(server);

//cors
app.use(cors({
	origin:process.env.PORT,
	credentials:true
}));

//body parser
app.use(formidableMiddleware({multiples: true}));


//api routes
app.use('/auth',authRoute);
app.use('/users',userRoute);



//mongodb connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    server.listen(80,(err,res)=>{
        if(err){
            console.log('Error '+ err)
        }else{
            console.log('Connected Successfully')
        }
    });
}).catch(err=>{
    console.log(err.message);
});