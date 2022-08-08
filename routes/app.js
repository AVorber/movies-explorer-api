const express = require('express');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);
routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { routes };
