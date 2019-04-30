const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const { Goods, Contracts, Likes } = require('../models');
const { postProcess } = require('../lib/util');
const { verifyToken } = require('../lib/auth');

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
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    normalizeRequest(req);
    req.fields.authorId = decoded.sub;

    const g = await Goods.register(req.fields);
    res.json(postProcess(g.toJSON()));
  } catch (err) {
    return next(err);
  }
});

router.get('/goods', async (req, res, next) => {
  try {
    const list = await Goods.list();
    res.json(list.map(l => postProcess(l.toJSON())));
  } catch (err) {
    return next(err);
  }
});

router.get('/goods/:id', async (req, res, next) => {
  try {
    const g = await Goods.get(req.params.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }
    res.json(postProcess(g.toJSON()));
  } catch (err) {
    return next(err);
  }
});

router.put('/goods/:id', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    const g = await Goods.get(req.params.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }
    if (g.authorId !== decoded.sub) {
      return next(createError(403, 'You are not own this good.'));
    }

    normalizeRequest(req);

    await g.modify(req.fields);
    res.json(postProcess(g.toJSON()));
  } catch (err) {
    return next(err);
  }
});

router.delete('/goods/:id', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    const g = await Goods.get(req.params.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }
    if (g.authorId !== decoded.sub) {
      return next(createError(403, 'You are not own this good.'));
    }

    await g.remove();
    res.json({});
  } catch (err) {
    return next(err);
  }
});

router.post('/goods/:id/like', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    const g = await Goods.get(req.params.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }

    const c = await Likes.like(decoded.sub, g.id);

    res.json(postProcess(c.toJSON()));
  } catch (err) {
    return next(err);
  }
});

router.post('/goods/:id/contract', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    const g = await Goods.get(req.params.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }

    const c = await Contracts.make(g, decoded.sub);

    res.json(postProcess(c.toJSON()));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
