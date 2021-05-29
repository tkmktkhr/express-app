import express from 'express';

export const router = express.Router();

router.get('/ping', (req, res) => {
  const jsonObj = {
    a: 'test',
    n: null,
  };
  res.send(jsonObj);
});
