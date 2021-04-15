const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Url {
    urlCode: String
    longUrl: String
    shortUrl: String
    date: Date
  }

  type Query {
    hello: String
    getUrl: Url
  }

  type Mutation {
    createShortUrl(longUrl: String!): Url!
  }
`;

module.exports = { typeDefs };
