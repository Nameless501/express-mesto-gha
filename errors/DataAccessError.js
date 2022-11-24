const {
  WRONG_LOGIN_CODE,
  WRONG_LOGIN_MESSAGE,
} = require('../utils/constants');
const CustomError = require('./CustomError');

class DataAccessError extends CustomError {
  constructor(message = WRONG_LOGIN_MESSAGE) {
    super(message);
    this.name = 'DataAccessError';
    this.message = message;
    this.code = WRONG_LOGIN_CODE;
  }
}

module.exports = DataAccessError;
