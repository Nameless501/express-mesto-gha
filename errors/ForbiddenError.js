const {
  FORBIDDEN_CODE,
  FORBIDDEN_MESSAGE,
} = require('../utils/constants');
const CustomError = require('./CustomError');

class ForbiddenError extends CustomError {
  constructor() {
    super();
    this.name = 'ForbiddenError';
    this.message = FORBIDDEN_MESSAGE;
    this.code = FORBIDDEN_CODE;
  }
}

module.exports = ForbiddenError;
