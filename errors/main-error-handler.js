const { SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE } = require('./constants');

const MainErrorHandler = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR_CODE ? SERVER_ERROR_MESSAGE : message,
  });
  next();
};

module.exports = MainErrorHandler;
