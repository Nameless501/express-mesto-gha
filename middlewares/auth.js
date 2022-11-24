const jwt = require('jsonwebtoken');
const DataAccessError = require('../errors/DataAccessError');
const { NEED_AUTH_MESSAGE, SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new DataAccessError(NEED_AUTH_MESSAGE));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new DataAccessError(NEED_AUTH_MESSAGE));
  }

  req.user = payload;
  next();
};
