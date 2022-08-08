const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { getUserInfo, updateUser } = require('../controllers/users');
const { isEmail } = require('../helpers/regex');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(isEmail),
  }),
}), updateUser);

module.exports = { usersRoutes };
