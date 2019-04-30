const express = require('express');
const router = express.Router();
const pkg = require('../package.json');

router.get('/', (req, res, next) => {
  try {
    res.json({ title: 'huzag', version: pkg.version });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
