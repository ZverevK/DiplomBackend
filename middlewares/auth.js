const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-error');

const { JWT_SECRET, NODE_ENV } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
