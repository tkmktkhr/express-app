import express from 'express';
import { getAuthorizeUrl } from '@/infrastructures/apis/googleApis';
import { runSample } from '@/infrastructures/apis/googleApis/index';
import { logger } from '@/app';

export const router = express.Router();

router.get('/ping', async (req, res) => {
  logger.debug('called ping');
  const pong = 'pong';
  res.send({ pong });
});

router.post('/post', async (req, res) => {
  logger.debug('called post-----------------------------------------');
  logger.debug(req.body);

  const pong = 'post';
  res.send({ pong });
});

router.get('/getAuthorizeUrl', async (req, res) => {
  logger.debug('called getAuthorizeUrl');
  const url = await getAuthorizeUrl();
  res.send({ url });
});

router.get('/userInfo', async (req, res) => {
  logger.debug('called userInfo');
  const code = req.query.code as string;

  const data = await runSample(code);
  res.send({ data });
});
