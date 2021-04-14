'use strict';
const dotenv = require('dotenv');

dotenv.config();

const DBUSER = process.env.DBUSER;
const DBPASSWORD = process.env.DBPASSWORD;
const DBNAME = process.env.DBNAME;

const Config = {
  DBUSER,
  DBPASSWORD,
  DBNAME,
};

module.exports = Config;
