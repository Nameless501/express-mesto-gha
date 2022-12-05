const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const DefaultError = require('../errors/DefaultError');

function handleLog(err) {
  console.log(err.message);
}

const handleError = (err, next) => {
  if (err.name === 'DataAccessError' || err.name === 'ForbiddenError' || err.name === 'NotFoundError') {
    next(err);
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new BadRequestError());
  } else if (err.code === 11000) {
    next(new ConflictError());
  } else {
    handleLog(err);

    next(new DefaultError());
  }
};

module.exports = { handleError };
