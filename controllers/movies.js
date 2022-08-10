const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const {
  BAD_MOVIE_ID_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  DELETE_OTHER_USERS_MONIES_ERROR_MESSAGE,
} = require('../errors/constants');

const getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const movie = new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    res.status(201).send(await movie.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const movieById = await Movie.findById(req.params.movieId);
    if (!movieById) {
      next(new NotFoundError(NOT_FOUND_MOVIE_ERROR_MESSAGE));
      return;
    }
    if (movieById.owner.toString() !== req.user._id) {
      next(new ForbiddenError(DELETE_OTHER_USERS_MONIES_ERROR_MESSAGE));
      return;
    }
    res.status(200).send(await movieById.deleteOne());
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(BAD_MOVIE_ID_ERROR_MESSAGE));
      return;
    }
    next(err);
  }
};

module.exports = { getMovies, createMovie, deleteMovieById };
