const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const logger = require('./logger');
const { PORT, BASEURL } = require('./env');
const { resolvers } = require('../resolvers');
const { typeDefs } = require('../typedefs');
const getUrlService = require('../utils/getUrlService');
const UrlService = require('../services/UrlService');

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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

  app.get('/', async (req, res) => {
    const UrlService = getUrlService();
    const urls = await UrlService.getUrls();
    const baseUrl = `${BASEURL}/graphql`;

    res.status(200);
    res.render('welcome', {
      title: 'Welcome to backdrop',
      urls,
      baseUrl,
    });
    res.end();
  });

  app.get('/:code', async (req, res, next) => {
    try {
      if (req.params.code === 'graphql') {
        return next();
      }
      const urlCode = req.params.code;

      const UrlService = getUrlService();
      const url = await UrlService.getUrl(urlCode);

      if (!url) {
        const error = new Error(`Url with the code:${urlCode} not found`);
        error.statusCode = 404;
        throw error;
      }

      res.redirect(url.longUrl);
    } catch (error) {
      logger.error(error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
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
