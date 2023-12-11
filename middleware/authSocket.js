const jwt = require('jsonwebtoken');

function authSocket(socket, next) {
    const token = socket.handshake.query.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_PASS);
            socket.decoded = decoded;
            console.log('User connected with valid token:', decoded);
            next(); 
        } catch (error) {

            console.log('User connection rejected. Invalid token:', token);
            socket.disconnect(true);

        }
    } else {

        console.log('User connection rejected. No token provided.');
        socket.disconnect(true);

    }
}

module.exports = authSocket;
