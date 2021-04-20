const { GraphQLDateTime } = require('graphql-iso-date');
const VoidResolver = require('./VoidResolver');
const QueryResolver = require('./QueryResolver');
const MutationResolver = require('./MutationResolver');

const resolvers = {
  Date: GraphQLDateTime,
  Void: VoidResolver,
  Query: QueryResolver,
  Mutation: MutationResolver,
};

module.exports = { resolvers };
