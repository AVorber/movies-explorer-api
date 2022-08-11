const { UNAUTHORIZED_ERROR_MESSAGE } = require('./constants');

class UnauthorizedError extends Error {
  constructor(message = UNAUTHORIZED_ERROR_MESSAGE) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
