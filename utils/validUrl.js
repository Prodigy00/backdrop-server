const validUrl = require('valid-url');

function isValidUrl(str) {
  return validUrl.isWebUri(str);
}

module.exports = isValidUrl;
