const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const { Goods } = require('../models');
const { postProcess } = require('../lib/util');

const UPLOAD_PATH = 'public/upload';

const normalizeRequest = (req) => {
  const files = req.files[''].map(f => {
    const idx = f.path.indexOf(UPLOAD_PATH) + UPLOAD_PATH.length;
    return f.path.substr(idx);
  });
  Object.assign(req.fields, {
    imagePaths: files,
  });

  if (req.fields.tags) {
    req.fields.tags = req.fields.tags.split(',').map(t => t.trim());
  }
};

router.post('/goods', async (req, res, next) => {
  normalizeRequest(req);

  // TODO: set userId from auth
  const g = await Goods.register(req.fields);
  res.json(postProcess(g.toJSON()));
});

router.get('/goods', async (req, res, next) => {
  const list = await Goods.list();
  res.json(list.map(l => postProcess(l.toJSON())));
});

router.get('/goods/:id', async (req, res, next) => {
  const g = await Goods.get(req.params.id);
  if (!g) { return next(createError(404, 'The good does not exist.')); }
  res.json(postProcess(g.toJSON()));
});

router.put('/goods/:id', async (req, res, next) => {
  const g = await Goods.get(req.params.id);
  if (!g) { return next(createError(404, 'The good does not exist.')); }

  normalizeRequest(req);

  await g.modify(req.fields);
  res.json(postProcess(g.toJSON()));
});

router.delete('/goods/:id', async (req, res, next) => {
  const g = await Goods.get(req.params.id);
  if (!g) { return next(createError(404, 'The good does not exist.')); }

  await g.remove();
  res.json({});
});

module.exports = router;
