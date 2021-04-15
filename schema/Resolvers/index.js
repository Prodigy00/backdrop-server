const { GraphQLDateTime } = require('graphql-iso-date');

const resolvers = {
  Date: GraphQLDateTime,

  Query: {
    hello: () => 'Hello world!',
  },

  Mutation: {
    createShortUrl: (parent, args) => {
      return null;
    },
  },
};

module.exports = { resolvers };
