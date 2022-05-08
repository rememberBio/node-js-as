const winston = require('winston');
var path = require('path');


module.exports = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname,'/log/main.log') }),
    ]
})