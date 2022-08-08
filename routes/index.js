const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const { login, logout, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.post('/signout', logout);

routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { routes };
