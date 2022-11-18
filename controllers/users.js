const User = require('../models/user');
const { handleError } = require('../utils/utils');
const { NotFoundError } = require('../errors/NotFound');
const { CREATED_CODE } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

const findUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_CODE).send({ data: user }))
    .catch((err) => handleError(err, res));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  getUsers,
  findUser,
  createUser,
  updateProfile,
  updateAvatar,
};
