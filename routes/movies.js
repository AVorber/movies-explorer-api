const express = require('express');
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovieById } = require('../middlewares/validation');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', validateCreateMovie, createMovie);
moviesRoutes.delete('/:movieId', validateDeleteMovieById, deleteMovieById);

module.exports = { moviesRoutes };
