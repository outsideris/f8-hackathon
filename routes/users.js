const express = require('express');

const { Users } = require('../models');
const { postProcess } = require('../lib/util');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  const u = await Users.signin(req.fields);
  res.json(postProcess(u.toJSON()));
});

router.get('/users', async (req, res, next) => {
  const list = await Users.list();
  res.json(list.map(l => postProcess(l.toJSON())));
});

module.exports = router;
