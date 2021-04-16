const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Url {
    _id: ID!
    urlCode: String
    longUrl: String
    shortUrl: String
    date: Date
  }

  type Query {
    getUrls: [Url]
  }

  type Mutation {
    createShortUrl(longUrl: String!): Url!
  }
`;

module.exports = { typeDefs };
