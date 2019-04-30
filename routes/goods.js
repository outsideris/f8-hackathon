const express = require('express');
const createError = require('http-errors');
const fs = require('fs');
const { promisify } = require('util');
const router = express.Router();
const readFile = promisify(fs.readFile);

const { Authors, Goods, Contracts, Likes } = require('../models');
const { postProcess } = require('../lib/util');
const { verifyToken } = require('../lib/auth');

const normalizeRequest = async (req) => {
  const files = await Promise.all(
    req.files['']
      .map(f => readFile(f.path).then(f => f.toString('base64')))
  );

  Object.assign(req.fields, {
    images: files,
  });
};

router.post('/add_data', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    await normalizeRequest(req);
    req.fields.authorId = decoded.sub;

    const g = await Goods.register(req.fields);

    const result = g.toJSON();
    delete result.updatedAt;
    delete result.createdAt;
    result.date = (new Date(result.date)).getTime();

    const a = await Authors.findOne({
      where: { id: result.authorId },
    });
    delete result.authorId;
    result.author = a.name;
    result.contact = a.contact;
    result.address = a.address;

    res.json(postProcess(result));
  } catch (err) {
    return next(err);
  }
});

router.post('/get_data', async (req, res, next) => {
  try {
    if (!Goods.Category.enumValues.map(c => c.name).includes(req.fields.model)) {
      return next(createError(400, 'unexpected format'));
    }

    const list = await Goods.list(req.fields.model);
    const result = list.map((l) => {
      const re = l.toJSON();

      delete re.images;

      delete re.updatedAt;
      delete re.createdAt;
      re.date = (new Date(re.date)).getTime();

      if (re.author) {
        re.contact = re.author.contact;
        re.address = re.author.address;
        re.author = re.author.name;
      }
      delete re.authorId;

      if (re.likes && re.likes.length) {
        re.likes = re.likes.map((l) => {
          if (l.author) {
            return l.author.contact;
          }
        });
      }

      postProcess(re);
      return re;
    });

    res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.post('/get_data_by_id', async (req, res, next) => {
  try {
    if (!Goods.Category.enumValues.map(c => c.name).includes(req.fields.model)) {
      return next(createError(400, 'unexpected format'));
    }

    const list = await Goods.listById(req.fields.model, req.fields.userId);
    const result = list.map((l) => {
      const re = l.toJSON();

      delete re.images;

      delete re.updatedAt;
      delete re.createdAt;
      re.date = (new Date(re.date)).getTime();

      if (re.author) {
        re.contact = re.author.contact;
        re.address = re.author.address;
        re.author = re.author.name;
      }
      delete re.authorId;
      if (re.likes && re.likes.length) {
        re.likes = re.likes.map((l) => {
          if (l.author) {
            return l.author.contact;
          }
        });
      }
      postProcess(re);
      return re;
    });
    res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.post('/get_data_by_likes', async (req, res, next) => {
  try {
    if (!Goods.Category.enumValues.map(c => c.name).includes(req.fields.model)) {
      return next(createError(400, 'unexpected format'));
    }

    const likedGoods = await Likes.findById(req.fields.userId);
    const goodIds = likedGoods.map(l => l.goodId);

    const list = await Goods.listByLikes(req.fields.model, goodIds);
    const result = list.map((l) => {
      const re = l.toJSON();

      delete re.images;

      delete re.updatedAt;
      delete re.createdAt;
      re.date = (new Date(re.date)).getTime();

      if (re.author) {
        re.contact = re.author.contact;
        re.address = re.author.address;
        re.author = re.author.name;
      }
      delete re.authorId;
      if (re.likes && re.likes.length) {
        re.likes = re.likes.map((l) => {
          if (l.author) {
            return l.author.contact;
          }
        });
      }
      postProcess(re);
      return re;
    });
    res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.post('/update_data', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    const g = await Goods.get(req.fields.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }
    if (g.authorId !== decoded.sub) {
      return next(createError(403, 'You are not own this good.'));
    }

    await normalizeRequest(req);
    await g.modify(req.fields);

    const result = g.toJSON();
    delete result.images;
    delete result.updatedAt;
    delete result.createdAt;
    result.date = (new Date(result.date)).getTime();

    const a = await Authors.findOne({
      where: { id: result.authorId },
    });
    delete result.authorId;
    result.author = a.name;
    result.contact = a.contact;
    result.address = a.address;

    res.json(postProcess(result));
  } catch (err) {
    return next(err);
  }
});

router.post('/delete_data', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    const g = await Goods.get(req.fields.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }
    if (g.authorId !== decoded.sub) {
      return next(createError(403, 'You are not own this good.'));
    }

    await g.remove();
    res.json({ msg: 'deleted' });
  } catch (err) {
    return next(err);
  }
});

router.post('/add_like', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    const g = await Goods.get(req.fields.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }

    const c = await Likes.like(decoded.sub, g.id);

    const result = c.toJSON();
    delete result.id;
    delete result.updatedAt;
    delete result.createdAt;

    res.json(postProcess(result));
  } catch (err) {
    return next(err);
  }
});

router.post('/delete_like', async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');
    const decoded = await verifyToken(authorization);

    const g = await Goods.get(req.fields.id);
    if (!g) { return next(createError(404, 'The good does not exist.')); }

    const c = await Likes.unlike(decoded.sub, g.id);
    res.json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
