const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const password = require('../regExp/password');
const users = require('./user');
const articles = require('./article');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(password),
  }),
}), createUser);

router.use(auth);
router.use('/articles', articles);
router.use('/users', users);

router.use('/', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  return next();
});
