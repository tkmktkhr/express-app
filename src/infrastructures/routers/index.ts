import express from 'express';
import { getAuthorizeUrl } from '@/infrastructures/apis/googleApis';
import { runSample } from '@/infrastructures/apis/googleApis/index';

export const router = express.Router();

router.get('/ping', async (req, res) => {
  const url = await getAuthorizeUrl();
  res.send({ url });
});

router.get('/userInfo', async (req, res) => {
  const data = await runSample();
  res.send({ data });
});
