const express = require('express');

const { Authors } = require('../models');
const { postProcess } = require('../lib/util');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  const u = await Authors.signin(req.fields);
  res.json(postProcess(u.toJSON()));
});

router.get('/authors', async (req, res, next) => {
  const list = await Authors.list();
  res.json(list.map(l => postProcess(l.toJSON())));
});

module.exports = router;
