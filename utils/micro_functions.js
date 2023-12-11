const bcrypt=require("bcryptjs");
require('dotenv').config();
const jwt=require("jsonwebtoken");

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
        console.log('verify',verify||'kkkkkkkkkkkkkkk');
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





module.exports={hashPassword,validatePassword,generateToken,validateToken,randomFixedInteger};
