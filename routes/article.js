const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, deleteArticle, createArticle } = require('../controllers/article');
const url = require('../regExp/url');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(url),
    image: Joi.string().required().pattern(url),
  }),
}), createArticle);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), deleteArticle);

module.exports = router;
