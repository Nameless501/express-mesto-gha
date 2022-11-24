const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
  }),
  createUser,
);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use(() => {
  throw new NotFoundError();
});

module.exports = router;
