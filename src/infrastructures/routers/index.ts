import express from 'express';
import { getAuthorizeUrl } from '@/infrastructures/apis/googleApis';
import { runSample } from '@/infrastructures/apis/googleApis/index';

export const router = express.Router();

router.get('/ping', async (req, res) => {
  const pong = 'pong';
  res.send({ pong });
});

router.get('/getAuthorizeUrl', async (req, res) => {
  const url = await getAuthorizeUrl();
  res.send({ url });
});

router.get('/userInfo', async (req, res) => {
  const code = req.query.code as string;

  const data = await runSample(code);
  res.send({ data });
});
