const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { getUser } = require('../controllers/user');

router.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), getUser);

module.exports = router;
