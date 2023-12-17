const bcrypt=require("bcryptjs");
require('dotenv').config();
const jwt=require("jsonwebtoken");
const ejs=require("ejs");
const path=require("path");
const { cloudinary } = require("../services/cloudinaryConfig");
const { transporter } = require("../services/nodemailConfig");


//----------------Send Email-----------------

async function sendMail(template, subject, toEmail, data) {
  
    try{
        const emailTemplate=await ejs.renderFile(`${path.dirname(__dirname)}/views/${template}.ejs`,data);
    
        var mailOptions = {
        from: 'harmonicsub8@gmail.com',
        to: toEmail,
        subject: subject,
        html: emailTemplate
        };

        const send=await transporter.sendMail(mailOptions);
        if(!send) return false;
        return true
    }catch(err){
        throw new Error(err.message);
    }
}


//-------------Multi Upload-------------
async function multimgUpload(files){
    try{
        const filesSave=[];
        if(files.size !== 0){
            for (let i = 0; i < files.length; i++) {
                const img=await cloudinary.uploader.upload(files[i].path);
                filesSave.push({public_id:img.public_id,url:img.secure_url});  
            }
            return filesSave;
        }else{
            return [];
        }
   
       
   
    }catch(err){
        console.log(err);
     throw new Error('Error uploading images')
   }
}
   

//------------Hash Passwords---------------
async function hashPassword(password) {

    try{console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii: ',password)

        let hashedPassword=await bcrypt.hash(password,10);
        return hashedPassword; 

    }catch{
        throw new Error('Password Encryption Failed')
    }
}


//------------Validate Password-------------
async function validatePassword(password,passwordToValidate) {

    try{
        const checkPassword=await bcrypt.compare(password, passwordToValidate);
        if(!checkPassword) return false
        return true;

    }catch{
        return false
    }
}



//------------Generate Token-------------
function generateToken(id,duration) {

    try{
        const token = jwt.sign({ id: id }, process.env.JWT_PASS, { expiresIn: duration });
        if(!token) throw new Error('Generate Token Error')
        return token;

    }catch{
        throw new Error('Generate Token Error')
    }
}

//------------Validate Token-------------
function validateToken(token) {
  console.log('token',token||'pppppppppp');
    try{
        const verify=jwt.verify(token,process.env.JWT_PASS);
        if(!verify) return false
        return verify;

    }catch{
        return false
    }
}
  

//---------Generate setLength of Random Number-------
function randomFixedInteger(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}



//---------Generate One time Stripe Link-------
async function generateOneTimePaymentLink(service,user,booking) {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
            {
                price_data: {
                currency: 'usd',
                product_data: {
                    name: service.name,
                },
                unit_amount: service.pricing,
                },
                quantity: 1,
            },
            ],
            mode: 'payment',
            metadata:{
                bid: booking._id,
                uid: user._id
            },
            success_url: 'http://localhost:3000/dashboard',
            cancel_url: 'http://localhost:3000/dashboard',
            customer_email:user.email
        });
          
        console.log("session.idsession.idsession.id: ",session);
        if(session){
            return session
        }else{
            return false
        }

    }catch(err){
        console.log("Stripeee Error: ",err);
        return false
    }
}


//---------Generate Subscription Stripe Link-------
async function generateSubscriptionPaymentLink(user,package) {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
            {
                price_data: {
                currency: 'usd',
                product_data: {
                    name: package.name,
                },
                unit_amount: package.amount,
                },
                quantity: 1,
            },
            ],
            mode: 'subscription',
            metadata:{
                uid: user._id,
                pid: package
            },
            success_url: 'http://localhost:3000/dashboard',
            cancel_url: 'http://localhost:3000/dashboard',
            customer_email:user.email
        });
          
        console.log("session.idsession.idsession.id: ",session);
        if(session){
            return session
        }else{
            return false
        }

    }catch(err){
        console.log("Stripeee Error: ",err);
        return false
    }
}



module.exports={generateOneTimePaymentLink,generateSubscriptionPaymentLink,sendMail,multimgUpload,hashPassword,validatePassword,generateToken,validateToken,randomFixedInteger};
