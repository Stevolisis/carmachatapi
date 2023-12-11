const express = require('express');
const jwt = require('jsonwebtoken');
const Mservice = require('../utils/micro_functions');
const app = express();

const verifyUser = (req, res, next) => {
  const auth_header = req.headers['authorization'];
  console.log(auth_header)
  if (!auth_header) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }
  const token = auth_header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  try {

    const decoded = Mservice.validateToken(token);
    if(!decoded){
        res.status(401).json({ message: 'Unauthorized: Invalid Token' });
        return;
    }
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports={verifyUser}