/* eslint-disable no-underscore-dangle */

const Category = require('../models/category');
const BadRequestError = require('../errors/badrequesterror');
// const NotFoundError = require('../errors/notfounderror');
// const ForbiddenError = require('../errors/forbiddenerror');

//  const { ConnectionClosedEvent } = require('mongodb');

module.exports.getCategories = (req, res, next) => {
  // const owner = req.user._id;

  Category.find()
    .then((categories) => {
      res.send(categories);
    })
    .catch(next);
};

module.exports.createCategory = (req, res, next) => {
  const owner = req.user._id;
  const { name } = req.body;
  Category.create({ name, owner })
    .then((categories) => res.status(201).send(categories))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};

module.exports.getCategoryById = (req, res, next) => {
  const categoryId = req.params.id;
  Category.findById(
    categoryId,
     )
    .then((category) => res.status(201).send(category))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};


// module.exports.createSubCategory = (req, res, next) => {
//   const categoryId = req.params;
//   const { name } = req.body;
//   console.log(categoryId);
//   Category.findByIdAndUpdate(
//     categoryId,
//     {
//       name,
//       new: true,
//     },

//   )
//     .then((categories) => res.status(201).send(categories))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(new BadRequestError('Переданы некорректные данные.'));
//         return;
//       }
//       next(err);
//     });
// };

// module.exports.deleteMovieById = (req, res, next) => {
//   const { movieId } = req.params;

//   Movie.findById(movieId)
//     .orFail(() => {
//       next(new NotFoundError('Фильм не найден.'));
//     })

//     .then((movie) => {
//       const owner = movie.owner.toString();

//       if (owner === req.user._id) {
//         Movie.deleteOne(movie)
//           .then(() => {
//             res.send(movie);
//           })
//           .catch(next);
//       } else {
//         next(new ForbiddenError('Вы не можете удалить
// эту карточку.')); // запрет на удаление чужой карточки
//       }
//     })

//     .catch(next);
// };
