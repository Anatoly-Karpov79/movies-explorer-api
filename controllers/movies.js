/* eslint-disable no-underscore-dangle */
const Movie = require('../models/movie');
const BadRequestError = require('../errors/badrequesterror');
const NotFoundError = require('../errors/notfounderror');
const ForbiddenError = require('../errors/forbiddenerror');

const {
  STATUS_OK,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;

  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner })
    .then((movies) => res.status(STATUS_OK).send(movies))
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  const { cardId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      next(new NotFoundError('Карточка не найдена.'));
    })

    .then((movie) => {
      const owner = movie.owner.toString();

      if (owner === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        next(new ForbiddenError('Вы не можете удалить эту карточку.')); // запрет на удаление чужой карточки
      }
    })

    .catch(next);
};
