const express = require('express');
const createError = require('http-errors');

const { Authors } = require('../models');
const { postProcess } = require('../lib/util');
const { issueToken } = require('../lib/auth');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  try {
    // TODO: check if code/token is valid to facebook
    if (!req.fields.contact) {
      return next(createError(400, 'contact is required.'));
    }
    const u = await Authors.signin(req.fields);
    const token = await issueToken(u.id);
    res.json(postProcess(Object.assign(u.toJSON(), { token })));
  } catch (err) {
    return next(err);
  }
});

router.get('/authors', async (req, res, next) => {
  try {
    const list = await Authors.list();
    res.json(list.map(l => postProcess(l.toJSON())));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
