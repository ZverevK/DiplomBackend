const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, deleteArticle, createArticle } = require('../controllers/article');
const url = require('../regExp/url');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(url),
  }),
}), createArticle);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), deleteArticle);

module.exports = router;
