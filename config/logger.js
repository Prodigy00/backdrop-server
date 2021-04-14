const winston = require('winston');

const {
  combine,
  splat,
  timestamp,
  printf,
  colorize,
  prettyPrint,
} = winston.format;

const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    splat(),
    timestamp(),
    prettyPrint(),
    customFormat
  ),
  defaultMeta: { service: 'url-shortener-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console(),
  ],
});

module.exports = logger;
