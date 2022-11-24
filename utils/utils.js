const CustomError = require('../errors/CustomError');
const {
  BAD_REQUEST_CODE,
  DEFAULT_ERROR_CODE,
  EMAIL_CONFLICT_CODE,
  BAD_REQUEST_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  EMAIL_CONFLICT_MESSAGE,
} = require('./constants');

function handleLog(err) {
  console.log(err.message);
}

const handleError = (err, res) => {
  if (err instanceof CustomError) {
    err.sendError(res);
  } else if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST_MESSAGE });
  } else if (err.name === 'CastError') {
    res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST_MESSAGE });
  } else if (err.code === 11000) {
    res.status(EMAIL_CONFLICT_CODE).send({ message: EMAIL_CONFLICT_MESSAGE });
  } else {
    handleLog(err);
    res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

module.exports = { handleError };
