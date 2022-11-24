const {
  NOT_FOUND_CODE,
  NOT_FOUND_MESSAGE,
} = require('../utils/constants');
const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
  constructor() {
    super();
    this.name = 'NotFoundError';
    this.message = NOT_FOUND_MESSAGE;
    this.code = NOT_FOUND_CODE;
  }
}

module.exports = NotFoundError;
