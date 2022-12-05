const jwt = require('jsonwebtoken');
const DataAccessError = require('../errors/DataAccessError');
const { NEED_AUTH_MESSAGE } = require('../utils/constants');

const { SECRET_KEY = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(new DataAccessError(NEED_AUTH_MESSAGE));
  } else {
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      next(new DataAccessError(NEED_AUTH_MESSAGE));
    }
  }

  req.user = payload;
  next();
};
