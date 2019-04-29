const express = require('express');

const { Users } = require('../models');
const { postProcess } = require('../lib/util');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  const u = await Users.signin(req.body);
  res.json(postProcess(u.toJSON()));
});

module.exports = router;
