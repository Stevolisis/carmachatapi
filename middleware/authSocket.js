const jwt = require('jsonwebtoken');

function authSocket(socket, next) {
    const token = socket.handshake.query.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_PASS);
            socket.decoded = decoded;
            next(); 
        } catch (error) {

            socket.disconnect(true);

        }
    } else {

        socket.disconnect(true);

    }
}

module.exports = authSocket;
