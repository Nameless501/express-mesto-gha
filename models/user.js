const mongoose = require('mongoose');
const validator = require('validator');

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
);

module.exports = mongoose.model('user', userSchema);
