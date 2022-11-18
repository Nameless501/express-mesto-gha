const Card = require('../models/card');
const { handleError, handleLike, handleDislike } = require('../utils/utils');
const NotFoundError = require('../errors/NotFound');
const { CREATED_CODE } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id }, (err, newCard) => {
    if (err) {
      handleError(err, res);
      return;
    }
    Card.findById(newCard._id)
      .populate(['owner', 'likes'])
      .then((card) => res.status(CREATED_CODE).send({ data: card }))
      .catch((e) => handleError(e, res));
  });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

const setCardLike = (req, res) => {
  handleLike(Card, req, res);
};

const setCardDislike = (req, res) => {
  handleDislike(Card, req, res);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  setCardDislike,
};
