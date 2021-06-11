import fastify from 'fastify';
import fastifyExpress from 'fastify-express';
import bodyParser from 'body-parser';
import { router } from '@/infrastructures/routers';
import log4js from 'log4js';
import cors from 'cors';

export const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug('Some debug messages');

const server = fastify();

const corsOptions = {
  origin: true,
};

const build = async () => {
  server.register(fastifyExpress).after(() => {
    // CORS setting must written before router.
    server.use(cors(corsOptions));
    server.use(bodyParser());
    server.use(router);
  });
  return server;
};

build()
  .then((server) =>
    server.listen(3030, '0.0.0.0', (err, address) => {
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
