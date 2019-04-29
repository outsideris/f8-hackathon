const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const camelize = require('camelcase');
const formidableMiddleware = require('express-formidable');
const mkdirp = require('mkdirp');

const indexRoutes = require('./routes/index');
const authorsRoutes = require('./routes/authors');
const goodsRoutes = require('./routes/goods');

mkdirp.sync('public/upload');

const app = express();

app.use(logger('dev'));
app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: `${__dirname}/public/upload`,
  multiples: true,
  keepExtensions: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.body) {
    const body = {};
    Object.keys(req.body).forEach((key) => {
      body[camelize(key)] = req.body[key];
    });
    req.body = body;
  }

  if (req.fields) {
    const fields = {};
    Object.keys(req.fields).forEach((key) => {
      fields[camelize(key)] = req.fields[key];
    });
    req.fields = fields;
  }
  next();
});

app.use('/', indexRoutes);
app.use('/api/v1', authorsRoutes);
app.use('/api/v1', goodsRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (!err.status) {
    console.error(err);
    return res.json({ status: 'error' });
  }

  res.json({ status: 'error', msg: err.message });
});

module.exports = app;
