import { logger } from '@/app';
// import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// export const routes = async (fastify: FastifyInstance, _options: FastifyServerOptions) => {
export const routes = async (fastify: FastifyInstance) => {
  fastify.get('/healthCheck', async (req: FastifyRequest, rep: FastifyReply) => {
    logger.debug({ req_from: req.ip });
    rep.send({ data: 'OK' });
  });

  fastify.post('/users', async (req: FastifyRequest, rep: FastifyReply) => {
    // const reqBody = validateReq(req.body);
    // const res = await userController.create(reqBody);
    const res = { id: 1, name: 'bob' };
    rep.send(res);
  });

  fastify.delete('/users/:id', async (req: FastifyRequest, rep: FastifyReply) => {
    // const reqParams = validateReq(req.params);
    // await companyController.delete(reqParams);
    rep.status(204).send();
  });
};
