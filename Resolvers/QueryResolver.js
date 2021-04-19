const { ApolloError } = require('apollo-server-errors');
const logger = require('../config/logger');
const getUrlService = require('../utils/getUrlService');

const UrlSource = getUrlService();

const QueryResolver = {
  getUrls: async () => {
    try {
      return await UrlSource.getUrls();
    } catch (err) {
      console.log({ err });
      throw new ApolloError('Something went wrong');
    }
  },
  getUrl: async (parent, args) => {
    try {
      const { urlCode } = args;

      const url = await UrlSource.getUrl(urlCode);

      if (!url) {
        throw new ApolloError('Url not found', '404');
      }

      return url.longUrl;
    } catch (error) {
      logger.error(error);
      throw new ApolloError(error, '500');
    }
  },
};

module.exports = QueryResolver;
