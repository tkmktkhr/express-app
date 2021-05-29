import fastify from 'fastify';
import fastifyExpress from 'fastify-express';
import express from 'express';
// import { router } from '@/src/infrastructures/routers'
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug('Some debug messages');

const server = fastify();

const router = express.Router();

router.get('/ping', (req, res) => {
  logger.debug('get ping');
  const jsonObj = {
    a: 'test',
    n: null,
  };
  res.send(jsonObj);
});

async function build() {
  await server.register(fastifyExpress).after(() => {
    server.use(router);
  });
  return server;
}

build()
  .then((server) =>
    server.listen(3030, (err, address) => {
      if (err) {
        logger.debug(err);
        process.exit(1);
      }
      logger.debug(`Server listening at ${address}`);
    }),
  )
  .catch(logger.debug);
