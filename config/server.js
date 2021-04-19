const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const logger = require('./logger');
const { PORT } = require('./env');
const { resolvers } = require('../Resolvers');
const { typeDefs } = require('../TypeDefs');

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => ({
      req,
      res,
      redirect: (path) => res.redirect(path),
    }),
  });

  await server.start();

  const app = express();

  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');

  const port = process.env.PORT || PORT;
  app.use(express.json({ extended: false }));

  app.get('/', (req, res) => {
    res.status(200);
    res.render('welcome', {
      title: 'Welcome to backdrop',
    });
    res.end();
  });

  app.get('/:code', (req, res) => {
    const urlCode = req.params.code;
    get;
    res.redirect('/graphql');
  });
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port }, resolve));

  logger.info(`🚀 Server listening on port:${port}${server.graphqlPath}`);

  app.use((error, req, res, next) => {
    logger.error(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

  return { server, app };
}

module.exports = startApolloServer;
