import express from 'express';
import { getAuthorizeUrl, setAccessToken } from '@/infrastructures/apis/googleApis';
import { getPeopleSrc } from '@/infrastructures/apis/googleApis';
import { logger } from '@/app';

export const router = express.Router();

router.get('/ping', async (req, res) => {
  logger.debug('called ping');
  const pong = 'get pong';
  res.send({ pong });
});

router.post('/post', async (req, res) => {
  res.send({ pong: 'post pong' });
});

router.get('/getAuthorizeUrl', async (req, res) => {
  logger.debug('called getAuthorizeUrl');
  logger.debug(req.query);
  const url = await getAuthorizeUrl();
  logger.debug(url);
  res.send({ url });
});

router.post('/setAccessToken', async (req, res) => {
  logger.debug('called setAccessToken');
  const code = req.body.data.code as string;
  if (!code) res.send({ data: null });
  logger.debug(code);
  await setAccessToken(code);
  res.send({ data: [] });
});

router.get('/userInfo', async (req, res) => {
  logger.debug('called userInfo');

  const data = await getPeopleSrc();
  logger.debug(data);
  res.send({ data });
});
