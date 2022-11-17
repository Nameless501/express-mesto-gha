const {
  BAD_REQUEST_CODE,
  BAD_REQUEST_MESSAGE,
} = require('../utils/constants');

class BadRequestError extends Error {
  constructor() {
    super();
    this.name = 'BadRequestError';
    this.message = BAD_REQUEST_MESSAGE;
    this.code = BAD_REQUEST_CODE;
  }
}

module.exports = { BadRequestError };
