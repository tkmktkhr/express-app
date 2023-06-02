import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
// import bodyParser from 'body-parser';
import { routes } from '@/infrastructures/routers';
import log4js from 'log4js';
// import cors from 'cors';
import fastifyCors from '@fastify/cors';

const port = process.env.PORT || 8887;

export const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug('Some debug messages');

export class AppServer {
  server: FastifyInstance;
  constructor() {
    this.server = fastify();
  }

  build = async () => {
    // await prisma.$connect(); // MEMO: avoid log error
    // [CAUTION] 非同期処理の記述順注意
    await this.server
      .setErrorHandler((err, request, reply) => errorHandler(err, request, reply))
      .register(fastifyCors, {
        origin: (origin, callback) => {
          // TODO allow all requests without origin check
          callback(null, true);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'X-API-KEY', 'x-spdemo-company-name'],
      })
      .addHook('onRequest', (request, reply, done) => {
        // [CAUTION] headerはリクエスト時に大文字でも、ここで小文字に変換されているため、小文字で取得すること。
        const apiKey = request.headers['x-api-key'];
        if (apiKey !== process.env['API_KEY']) {
          logger.error(`Wrong Api Key: ${apiKey}`);
          throw new BadRequestError();
        }
        done();
      })
      .addHook('preHandler', (request, reply, done) => {
        reply.header('Content-Type', 'application/json');
        done();
      })
      .register(routes);
    return this.server;
  };
}

const appServer = new AppServer();
appServer
  .build()
  .then((server) => {
    server.listen(port, '0.0.0.0', (err, address) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
    });
  })
  .catch(logger.error);

// TODO to error modules
class BadRequestError extends Error {
  constructor(msg?: string) {
    super();
    this.name = new.target.name;
    this.message = msg ?? this.name;
  }
}

export const errorHandler = (err: Error | Array<Error>, _: FastifyRequest, rep: FastifyReply): void => {
  if (err instanceof BadRequestError) {
    logger.error({ err });
    rep.status(400).send({ err: err.message ?? 'BadRequest' });
    return;
  }
  logger.error({ err });
  rep.status(500).send({ err: 'Internal Server Error' });
  return;
};

// const server = fastify();

// const corsOptions = {
//   origin: true,
// };

// const build = async () => {
//   server.register(fastifyExpress).after(() => {
//     // CORS setting must written before router.
//     server.use(cors(corsOptions));
//     server.use(bodyParser());
//     server.use(router);
//   });
//   return server;
// };

// build()
//   .then((server) =>
//     server.listen(port, '0.0.0.0', (err, address) => {
//       if (err) {
//         logger.debug(err);
//         /*global process*/
//         /*eslint no-undef: "error"*/
//         process.exit(1);
//       }
//       logger.debug(`Server listening at ${address}`);
//     }),
//   )
//   .catch(logger.debug);
