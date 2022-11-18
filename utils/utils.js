const {
  BAD_REQUEST_CODE,
  DEFAULT_ERROR_CODE,
  BAD_REQUEST_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
} = require('./constants');
const NotFoundError = require('../errors/NotFound');

function handleLog(err) {
  console.log(err.message);
}

const handleError = (err, res) => {
  if (err.name === 'BadRequestError' || err.name === 'NotFoundError') {
    res.status(err.code).send({ message: err.message });
  } else if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST_MESSAGE });
  } else if (err.name === 'CastError') {
    res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST_MESSAGE });
  } else {
    handleLog(err);
    res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

function handleLikeToggle(action) {
  return function (Card, req, res) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { [action]: { likes: req.user._id } },
      { new: true, runValidators: true },
    )
      .orFail(() => {
        throw new NotFoundError();
      })
      .populate(['owner', 'likes'])
      .then((card) => res.send({ data: card }))
      .catch((err) => handleError(err, res));
  };
}

const handleLike = (Card, req, res) => {
  const likeDecorator = handleLikeToggle('$addToSet');
  likeDecorator(Card, req, res);
};

const handleDislike = (Card, req, res) => {
  const dislikeDecorator = handleLikeToggle('$pull');
  dislikeDecorator(Card, req, res);
};

module.exports = { handleError, handleLike, handleDislike };
