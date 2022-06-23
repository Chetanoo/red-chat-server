const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.Http({
      level: 'warn',
      format: winston.format.json(),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
