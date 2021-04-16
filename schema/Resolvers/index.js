const { GraphQLDateTime } = require('graphql-iso-date');
const isValidUrl = require('../../utils/validUrl');
const nanoid = require('../../utils/nano');
const Url = require('../models/url');
const { BASEURL } = require('../../config/env');
const { UserInputError, ApolloError } = require('apollo-server-errors');

const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    getUrls: async () => {
      try {
        return await Url.find({});
      } catch (err) {
        console.log({ err });
        throw new ApolloError('Something went wrong');
      }
    },
  },

  Mutation: {
    createShortUrl: async (parent, args) => {
      const { longUrl } = args;

      const baseUrl = BASEURL;
      const urlCode = nanoid();

      const valid = isValidUrl(baseUrl);

      if (!valid) {
        throw new UserInputError('Invalid base url');
      }

      if (isValidUrl(longUrl)) {
        try {
          let url = await Url.findOne({ longUrl });

          if (url) {
            return url;
          }

          const shortUrl = baseUrl + '/' + urlCode;

          url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date(),
          });

          await url.save();

          return url;
        } catch (err) {
          throw new ApolloError('Something went wrong');
        }
      } else {
        throw new UserInputError('Invalid base url');
      }
    },
  },
};

module.exports = { resolvers };
