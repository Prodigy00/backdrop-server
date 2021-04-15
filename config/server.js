const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const logger = require('./logger');
const { PORT } = require('./env');
const { resolvers } = require('../schema/Resolvers');
const { typeDefs } = require('../schema/TypeDefs');

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();

  app.use(express.json({ extended: false }));
  app.use(cors());

  server.applyMiddleware({ app });

  const port = process.env.PORT || PORT;

  await new Promise((resolve) => app.listen({ port }, resolve));

  logger.info(
    `🚀 Server listening on http://locahost:${port}${server.graphqlPath}`
  );

  return { server, app };
}

module.exports = startApolloServer;
