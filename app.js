require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const apilimiter = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');
const routerMovies = require('./routes/movies');
const routerUsers = require('./routes/users');
const NotFoundError = require('./errors/notfounderror');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./errors/error');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(apilimiter);
app.use(routerUsers);
app.use(routerMovies);

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.use(errorLogger);
app.use(errors());

app.use(error);

app.listen(PORT);
