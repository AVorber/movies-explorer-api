const { BAD_REQUEST_ERROR_MESSAGE } = require('./constants');

class BadRequestError extends Error {
  constructor(message = BAD_REQUEST_ERROR_MESSAGE) {
    super(message);
    this.statusCode = 400;
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;
