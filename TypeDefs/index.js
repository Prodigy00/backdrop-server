const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  scalar Void

  type Url {
    _id: ID!
    urlCode: String
    longUrl: String
    shortUrl: String
    date: Date
  }

  type Query {
    getUrls: [Url]
    getUrl(urlCode: String!): String #Void
  }

  type Mutation {
    shortenUrl(longUrl: String!): Url!
  }
`;

module.exports = { typeDefs };
