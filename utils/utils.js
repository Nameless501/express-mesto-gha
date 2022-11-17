const {
  BAD_REQUEST_CODE,
  DEFAULT_ERROR_CODE,
  BAD_REQUEST_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
} = require('./constants');

function handleLog(err) {
  console.log(err.message);
}

const handleError = (err, res) => {
  if (err.name === 'BadRequestError' || err.name === 'NotFoundError') {
    handleLog(err);
    res.status(err.code).send({ message: err.message });
  } else if (err.name === 'ValidationError') {
    handleLog(err);
    res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST_MESSAGE });
  } else if (err.name === 'CastError') {
    handleLog(err);
    res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST_MESSAGE });
  } else {
    handleLog(err);
    res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

module.exports = { handleError };
