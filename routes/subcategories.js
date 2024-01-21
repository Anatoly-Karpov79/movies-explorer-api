const routerSubCategories = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  createSubCategory,
  getSubCategories,
  // deleteMovieById,
} = require('../controllers/subcategories');

routerSubCategories.post('/categories/:id', auth, createSubCategory);

routerSubCategories.get('/categories/:id', auth, getSubCategories);

// routerMovies.delete('/movies/:movieId', auth, celebrate({
//   params: Joi.object().keys({
//     movieId: Joi.string().required().hex().length(24),
//   }),
// }), deleteMovieById);

module.exports = routerSubCategories;
