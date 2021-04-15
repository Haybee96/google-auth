require('dotenv').config();

module.exports = {
    clientId: process.env.CLIENTID,
    secret: process.env.SECRET,
    callback: 'http://localhost:8888/callback',
};