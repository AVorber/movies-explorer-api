require('dotenv').config();
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { limiter } = require('./helpers/rate-limiter');
const cors = require('./middlewares/cors');
const { SERVER_ERROR } = require('./errors/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors);
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limiter);

app.use(cookieParser());

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res.status(statusCode).send({ message: statusCode === SERVER_ERROR ? 'На сервере произошла ошибка' : message });
  next();
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(PORT);
