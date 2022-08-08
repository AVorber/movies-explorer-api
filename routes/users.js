const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { getUserInfo, updateUser } = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = { usersRoutes };
