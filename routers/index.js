const router = require('express').Router();
const { NOT_FOUND_CODE, NOT_FOUND_MESSAGE } = require('../utils/constants');

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_MESSAGE });
});

module.exports = router;
