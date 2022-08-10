const express = require('express');
const { getUserInfo, updateUser } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validation');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);
usersRoutes.patch('/me', validateUpdateUser, updateUser);

module.exports = { usersRoutes };
