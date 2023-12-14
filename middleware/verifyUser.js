const express = require('express');
const Mservice = require('../utils/micro_functions');

const verifyUser = (req, res, next) => {
  const auth_header = req.headers['authorization'];

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