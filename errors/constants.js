const SERVER_ERROR_CODE = 500;

const USER_LOGOUT_MESSAGE = 'Пользователь разлогинен';
const BAD_REQUEST_ERROR_MESSAGE = 'Переданы некорректные данные';
const BAD_USER_ID_ERROR_MESSAGE = 'Некорректный id пользователя';
const BAD_MOVIE_ID_ERROR_MESSAGE = 'Некорректный id фильма';
const NOT_FOUND_PAGE_ERROR_MESSAGE = 'Страница не найдена';
const NOT_FOUND_USER_ERROR_MESSAGE = 'Пользователь не найден';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Фильм не найден';
const USER_ALREADY_EXIST_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const DELETE_OTHER_USERS_MONIES_ERROR_MESSAGE = 'Нельзя удалять фильмы других пользователей';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  USER_LOGOUT_MESSAGE,
  SERVER_ERROR_CODE,
  BAD_REQUEST_ERROR_MESSAGE,
  BAD_USER_ID_ERROR_MESSAGE,
  BAD_MOVIE_ID_ERROR_MESSAGE,
  NOT_FOUND_PAGE_ERROR_MESSAGE,
  NOT_FOUND_USER_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  USER_ALREADY_EXIST_ERROR_MESSAGE,
  DELETE_OTHER_USERS_MONIES_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
};
