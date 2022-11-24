const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const { LINK_REG_EXP } = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (link) => LINK_REG_EXP.test(link),
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    statics: {
      handleLikeToggle(req, res, next, action) {
        return this.findByIdAndUpdate(
          req.params.cardId,
          { [action]: { likes: req.user._id } },
          { new: true, runValidators: true },
        )
          .orFail(() => {
            throw new NotFoundError();
          })
          .populate(['owner', 'likes'])
          .then((card) => res.send({ data: card }))
          .catch(next);
      },
    },
  },
);

module.exports = mongoose.model('card', cardSchema);
