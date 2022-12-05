const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  setCardDislike,
} = require('../controllers/cards');
const { cardIdValidation, cardDataValidation } = require('../utils/requestValidators');

router.get('/', getCards);
router.post('/', cardIdValidation, createCard);
router.delete('/:cardId', cardDataValidation, deleteCard);
router.put('/:cardId/likes', cardDataValidation, setCardLike);
router.delete('/:cardId/likes', cardDataValidation, setCardDislike);

module.exports = router;
