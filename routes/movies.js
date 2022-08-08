const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { isURL } = require('../helpers/regex');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(isURL),
    trailerLink: Joi.string().required().regex(isURL),
    thumbnail: Joi.string().required().regex(isURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
moviesRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = { moviesRoutes };
