/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');


const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');
const { handleError } = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();
// const cors = require('cors');
app.use(express.json());
// app.use(cors({ origin: ['http://localhost:3010'], credentials: true }));

// app.use(cors());

// // настраиваем `CORS`
// const corsOptions = {
//   origin: 'https://example.com',
//   optionSuccessStatus: 200, // для старых браузеров и SmartTV
// };
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

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on port ${PORT}!`);
});
