/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
// require('dotenv').config();

const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');
const { handleError } = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3001', 'https://localhost:3001', 'http://localhost:3000', 'https://localhost:3000', 'http://zuevmesto.students.nomoreparties.sbs', 'http://api.zuevmesto.students.nomoreparties.sbs', 'https://zuevmesto.students.nomoreparties.sbs', 'https://api.zuevmesto.students.nomoreparties.sbs'], credentials: true, maxAge: 3600 }));

app.use(helmet());

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  // eslint-disable-next-line no-unused-vars
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use(cookieParser());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on port ${PORT}!+-`);
});
