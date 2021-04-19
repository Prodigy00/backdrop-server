const mongoose = require('mongoose');
const logger = require('../config/logger');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);

urlSchema.methods.findOne = async function ({ urlCode }) {
  try {
    return await Url.findOne({ urlCode });
  } catch (err) {
    logger.error('Database Error: %O', err);
  }
};

urlSchema.methods.find = async function () {
  try {
    return await Url.find({});
  } catch (err) {
    logger.error('Database Error: %O', err);
  }
};

module.exports = Url;
