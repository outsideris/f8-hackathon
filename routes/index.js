const express = require('express');
const router = express.Router();
const pkg = require('../package.json');

router.get('/', function(req, res, next) {
  res.json({ title: 'f8hackathon', version: pkg.version });
});

module.exports = router;
