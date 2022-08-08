const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

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
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const movieById = await Movie.findById(req.params.movieId);
    if (!movieById) {
      next(new NotFoundError('Фильм не найден'));
      return;
    }
    if (movieById.owner.toString() !== req.user._id) {
      next(new ForbiddenError('Нельзя удалять фильмы других пользователей'));
      return;
    }
    res.status(200).send(await movieById.deleteOne());
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id фильма'));
      return;
    }
    next(err);
  }
};

module.exports = { getMovies, createMovie, deleteMovieById };
