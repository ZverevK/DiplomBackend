const { JWT_SECRET = 'dev-secret', NODE_ENV, DB = 'mongodb://localhost:27017/diplomdb' } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DB,
};

const whitelist = [
  'http://localhost:8080',
  'https://localhost:8080',
];

module.exports.WHITELIST = whitelist;
