const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const {
  USER_LOGOUT_MESSAGE,
  BAD_USER_ID_ERROR_MESSAGE,
  NOT_FOUND_USER_ERROR_MESSAGE,
  USER_ALREADY_EXIST_ERROR_MESSAGE,
} = require('../errors/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: USER_LOGOUT_MESSAGE });
  } catch (err) {
    next(err);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError(NOT_FOUND_USER_ERROR_MESSAGE));
      return;
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(BAD_USER_ID_ERROR_MESSAGE));
      return;
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    res.status(201).send(await user.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
      return;
    }
    if (err.code === 11000) {
      next(new ConflictError(USER_ALREADY_EXIST_ERROR_MESSAGE));
      return;
    }
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      next(new NotFoundError(NOT_FOUND_USER_ERROR_MESSAGE));
      return;
    }
    res.status(200).send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
      return;
    }
    if (err.code === 11000) {
      next(new ConflictError(USER_ALREADY_EXIST_ERROR_MESSAGE));
      return;
    }
    next(err);
  }
};

module.exports = {
  login,
  logout,
  getUserInfo,
  createUser,
  updateUser,
};
