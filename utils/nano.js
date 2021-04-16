const { customRandom, urlAlphabet, random } = require('nanoid');

const nanoid = customRandom(urlAlphabet, 6, random);

module.exports = nanoid;
