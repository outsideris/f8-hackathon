const express = require('express');
const router = express.Router();

const { Goods } = require('../models');
const { postProcess } = require('../lib/util');

const UPLOAD_PATH = 'public/upload';

router.post('/goods', async (req, res, next) => {
  const files = req.files[''].map(f => {
    const idx = f.path.indexOf(UPLOAD_PATH) + UPLOAD_PATH.length;
    return f.path.substr(idx);
  });
  Object.assign(req.fields, {
    imagePaths: files,
  })

  if (req.fields.tags) {
    req.fields.tags = req.fields.tags.split(',').map(t => t.trim());
  }

  const g = await Goods.register(req.fields);
  res.json(postProcess(g.toJSON()));
});

module.exports = router;
