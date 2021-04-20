const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const logger = require('./logger');
const { PORT } = require('./env');
const UrlController = require('../controllers');
const ErrorHandler = require('../middlewares/errorHandler');

const { resolvers } = require('../Resolvers');
const { typeDefs } = require('../TypeDefs');

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: async ({ req, res }) => ({
      req,
      res,
    }),
  });

  await server.start();

  const app = express();

  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');

  const port = process.env.PORT || PORT;

  app.use(express.json({ extended: false }));
  app.get('/', UrlController.handleHomeRoute);
  app.get('/:code', UrlController.handleUrlRedirectLink);

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port }, resolve));

  logger.info(`🚀 Server listening on port:${port}${server.graphqlPath}`);

  app.use(ErrorHandler);

  return { server, app };
}

module.exports = startApolloServer;
