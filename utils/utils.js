const { Error } = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

function handleLog(err) {
  console.log(err.message);
}

const handleError = (err, next) => {
  if (err instanceof Error || err.code === 11000) {
    const currentError = err instanceof Error ? new BadRequestError() : new ConflictError();
    next(currentError);
  } else {
    next(err);
  }
};

module.exports = { handleError, handleLog };
