const logger = require('../config/logger');

const ErrorHandler = (error, req, res, next) => {
  logger.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
};

module.exports = ErrorHandler;
