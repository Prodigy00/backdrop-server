const Url = require('../models/url');
const UrlService = require('../services/UrlService');

module.exports = function getUrlService() {
  return new UrlService(Url);
};
