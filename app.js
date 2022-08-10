require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const MainErrorHandler = require('./errors/main-error-handler');
const { PORT, MONGODB_CONNECTION } = require('./helpers/config');
const { limiter } = require('./helpers/rate-limiter');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes/index');

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
app.use(MainErrorHandler);

mongoose.connect(MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(PORT);
