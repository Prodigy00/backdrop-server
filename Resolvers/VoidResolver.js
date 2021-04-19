const { GraphQLScalarType } = require('graphql');

const Void = {
  name: 'Void',

  description: 'Represents NULL values',

  serialize() {
    return null;
  },

  parseValue() {
    return null;
  },

  parseLiteral() {
    return null;
  },
};

const VoidResolver = new GraphQLScalarType(Void);

module.exports = VoidResolver;
