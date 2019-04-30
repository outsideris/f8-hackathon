const express = require('express');
const createError = require('http-errors');
const fs = require('fs');
const { promisify } = require('util');

const { Authors } = require('../models');
const { postProcess } = require('../lib/util');
const { issueToken } = require('../lib/auth');

const router = express.Router();
const readFile = promisify(fs.readFile);

router.post('/signin', async (req, res, next) => {
  try {
    if (!req.fields.contact) {
      return next(createError(400, 'contact is required.'));
    }

    if (req.files[''].path) {
      const profile = await readFile(req.files[''].path);
      req.fields.image = profile.toString('base64');
    }

    const u = await Authors.signin(req.fields);
    const token = await issueToken(u.id);
    res.json(postProcess(Object.assign(u.toJSON(), { token })));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
