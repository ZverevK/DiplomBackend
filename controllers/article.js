const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getCards = (req, res, next) => {
  Article.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id).orFail(new NotFoundError(`Карточка не найдена ${req.params.id}`))
    // eslint-disable-next-line arrow-body-style
    .then((card) => {
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Неверный запрос ${err.message}`));
      }
      return next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image,
  })
    .then((user) => res.status(200).send({ user }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Неверный запрос ${err.message}`));
      }
      return next(err);
    });
};
