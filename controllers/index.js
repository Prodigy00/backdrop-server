const getUrlService = require('../utils/getUrlService');
const { BASEURL } = require('../config/env');

const handleUrlRedirectLink = async (req, res, next) => {
  try {
    if (req.params.code === 'graphql') {
      return next();
    }
    const urlCode = req.params.code;

    const UrlService = getUrlService();
    const url = await UrlService.getUrl(urlCode);

    if (!url) {
      const error = new Error(`Url with the code:${urlCode} not found`);
      error.statusCode = 404;
      throw error;
    }

    res.redirect(url.longUrl);
  } catch (error) {
    logger.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const handleHomeRoute = async (req, res) => {
  const UrlService = getUrlService();
  const urls = await UrlService.getUrls();
  const baseUrl = `${BASEURL}/graphql`;

  res.status(200);
  res.render('welcome', {
    title: 'Welcome to backdrop',
    urls,
    baseUrl,
  });
  res.end();
};

const UrlController = {
  handleUrlRedirectLink,
  handleHomeRoute,
};
module.exports = UrlController;
