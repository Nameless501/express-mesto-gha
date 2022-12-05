const { Error } = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

function handleLog(err) {
  console.log(err.message);
}

const handleError = (err, next) => {
  if (err instanceof Error || err.name === 'MongoServerError') {
    let currentError;

    if (err instanceof Error) {
      currentError = new BadRequestError();
    } else if (err.name === 'MongoServerError' && err.code === 11000) {
      console.log(err.code)
      currentError = new ConflictError();
    }

    next(currentError);
  } else {
    next(err);
  }
};

module.exports = { handleError, handleLog };
