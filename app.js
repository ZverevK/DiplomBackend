require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { rateLimit } = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, DB_LINK = 'mongodb://localhost:27017/diplomdb' } = process.env;
mongoose.connect(DB_LINK, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(rateLimit);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(errorLogger);
app.use(errors());

app.listen(PORT);
