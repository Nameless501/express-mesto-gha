const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CREATED_CODE } = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id }, (err, newCard) => {
    if (err) {
      next(err);
      return;
    }
    Card.findById(newCard._id)
      .populate(['owner', 'likes'])
      .then((card) => res.status(CREATED_CODE).send({ data: card }))
      .catch(next);
  });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => {
      const isOwn = card.owner.toString() === req.user._id;
      if (isOwn) {
        card.remove();
        res.send({ data: card });
      } else {
        throw new ForbiddenError();
      }
    })
    .catch(next);
};

const setCardLike = (req, res, next) => {
  Card.handleLikeToggle(req, res, next, '$addToSet');
};

const setCardDislike = (req, res, next) => {
  Card.handleLikeToggle(req, res, next, '$pull');
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  setCardDislike,
};
