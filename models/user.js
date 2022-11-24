const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const DataAccessError = require('../errors/DataAccessError');
const NotFoundError = require('../errors/NotFoundError');
const { LINK_REG_EXP } = require('../utils/constants');

const {
  DEFAULT_USER_NAME,
  DEFAULT_USER_ABOUT,
  DEFAULT_AVATAR_LINK,
} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: DEFAULT_USER_NAME,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: DEFAULT_USER_ABOUT,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR_LINK,
      validate: {
        validator: (link) => LINK_REG_EXP.test(link),
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .orFail(() => {
            throw new DataAccessError();
          })
          .then((user) => bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new DataAccessError();
              }
              return user;
            }));
      },
      findUserById(id, res, next) {
        return this.findById(id)
          .orFail(() => {
            throw new NotFoundError();
          })
          .then((user) => res.send({ data: user }))
          .catch(next);
      },
      updateUserData(id, res, next, params) {
        return this.findByIdAndUpdate(id, params, { new: true, runValidators: true })
          .orFail(() => {
            throw new NotFoundError();
          })
          .then((user) => res.send({ data: user }))
          .catch(next);
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
