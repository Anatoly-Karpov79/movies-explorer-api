const SubCategory = require('../models/subcategories');
const BadRequestError = require('../errors/badrequesterror');
// const NotFoundError = require('../errors/notfounderror');
// const ForbiddenError = require('../errors/forbiddenerror');

// const { ConnectionClosedEvent } = require('mongodb');

module.exports.getSubCategories = (req, res, next) => {
   const categoryId = req.params.id;
   const owner = req.user._id;
  SubCategory.find ({
    "category" : categoryId,
    "owner" : owner
  })
 // .strictPopulate(categoryId)

    .then((subCategories) => {
      res.send(subCategories);
    })
    .catch(next);
};

module.exports.createSubCategory = (req, res, next) => {
  const category = req.params.id;
  const owner = req.user._id;
  const { name } = req.body;
  SubCategory.create({
    name,
    category,
    owner,
  })

    .then((subCategories) => res.status(201).send(subCategories))

    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};

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
