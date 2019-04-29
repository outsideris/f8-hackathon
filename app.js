const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const camelize = require('camelcase');

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const goodsRoutes = require('./routes/goods');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.body) {
    const body = {};
    Object.keys(req.body).forEach((key) => {
      body[camelize(key)] = req.body[key];
    });
    req.body = body;
  }
  next();
});

app.use('/', indexRoutes);
app.use('/api/v1', usersRoutes);
app.use('/api/v1', goodsRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);

  res.status(err.status || 500);
  res.json({ status: 'error' });
});

module.exports = app;
