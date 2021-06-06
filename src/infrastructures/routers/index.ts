import express from 'express';
import { getAuthorizeUrl } from '@/infrastructures/apis/googleApis';
import { getPeopleSrc } from '@/infrastructures/apis/googleApis';
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
  logger.debug(req.query);
  const url = await getAuthorizeUrl();
  res.send({ url });
});

router.get('/userInfo', async (req, res) => {
  logger.debug('called userInfo');
  const code = req.query.code as string;
  logger.debug(req.query);
  if (!code) res.send({ data: null });

  const data = await getPeopleSrc(code);
  logger.debug(data);
  res.send({ data });
});
