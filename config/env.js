'use strict';
const dotenv = require('dotenv');

dotenv.config();

const DBUSER = process.env.DBUSER;
const DBPASSWORD = process.env.DBPASSWORD;
const DBNAME = process.env.DBNAME;
const PORT = process.env.PORT;
const BASEURL = process.env.BASEURL;

const Config = {
  DBUSER,
  DBPASSWORD,
  DBNAME,
  PORT,
  BASEURL,
};

module.exports = Config;
