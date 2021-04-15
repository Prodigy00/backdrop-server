const database = require('./db');
const logger = require('./logger');
const server = require('./server');
const env = require('./env');

module.exports = {
  database,
  logger,
  server,
  env,
};
