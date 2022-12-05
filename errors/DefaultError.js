const {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require('../utils/constants');

class DefaultError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGE) {
    super(message);
    this.name = 'DefaultError';
    this.code = DEFAULT_ERROR_CODE;
  }
}

module.exports = DefaultError;
