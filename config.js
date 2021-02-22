const { JWT_SECRET = 'dev-secret', NODE_ENV, DB = 'mongodb://localhost:27017/diplomdb' } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DB,
};

const whitelist = [
  'http://localhost:8080',
  'https://localhost:8080',
  'http://diproject.students.nomoreparties.space',
  'https://diproject.students.nomoreparties.space',
  'http://www.diproject.students.nomoreparties.space',
  'https://www.diproject.students.nomoreparties.space',
];

module.exports.WHITELIST = whitelist;
