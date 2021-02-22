const cors = require('cors');
const { WHITELIST } = require('../config');

const options = {
  origin: (origin, callback) => {
    if (WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
    'credentials',
  ],
  credentials: true,
};

module.exports.cors = cors(options);
