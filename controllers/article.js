const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).orFail(new NotFoundError(`Карточка не найдена ${req.params.id}`))
    .then((data) => {
      if (data.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      } else {
        Article.findByIdAndRemove(req.params.id)
          .then((card) => res.send(card))
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Неверный запрос ${err.message}`));
      }
      return next(err);
    });
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Неверный запрос ${err.message}`));
      }
      return next(err);
    });
};
