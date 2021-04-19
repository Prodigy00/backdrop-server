const { GraphQLDateTime } = require('graphql-iso-date');
const { UserInputError, ApolloError } = require('apollo-server-errors');
const isValidUrl = require('../utils/validUrl');
const nanoid = require('../utils/nano');

const Url = require('../models/url');
const { BASEURL } = require('../config/env');
const VoidResolver = require('./VoidResolver');
const QueryResolver = require('./QueryResolver');

const resolvers = {
  Date: GraphQLDateTime,
  Void: VoidResolver,
  Query: QueryResolver,

  Mutation: {
    shortenUrl: async (parent, args) => {
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

          const shortUrl = baseUrl + urlCode;

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
