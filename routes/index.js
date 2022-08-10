const express = require('express');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const { login, logout, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

const routes = express.Router();

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateCreateUser, createUser);

routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.post('/signout', logout);

routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { routes };
