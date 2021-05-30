import fastify from 'fastify';
import fastifyExpress from 'fastify-express';
import { router } from '@/infrastructures/routers';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug('Some debug messages');

const server = fastify();

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
        /*global process*/
        /*eslint no-undef: "error"*/
        process.exit(1);
      }
      logger.debug(`Server listening at ${address}`);
    }),
  )
  .catch(logger.debug);
