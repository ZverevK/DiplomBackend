const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const AuthorizationError = require('../errors/authorization-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Проверьте правильность данных'));
      }
      return res.status(200).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Ошибка валидации ${err.message}`));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError('Данный email уже используется'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.send({ token });
    })
    .catch((err) => next(new AuthorizationError(`${err.message}`)));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
};
