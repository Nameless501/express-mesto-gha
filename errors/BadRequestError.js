const {
  BAD_REQUEST_CODE,
  BAD_REQUEST_MESSAGE,
} = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = BAD_REQUEST_MESSAGE) {
    super(message);
    this.name = 'BadRequestError';
    this.code = BAD_REQUEST_CODE;
  }
}

module.exports = BadRequestError;
