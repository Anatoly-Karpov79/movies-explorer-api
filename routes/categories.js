const routerCategories = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  createCategory,
  getCategories,
  getCategoryById,
  // createSubCategory,
 // updateCategory,
  // deleteMovieById,
} = require('../controllers/categories');

routerCategories.post('/categories', auth, createCategory);
// routerCategories.patch('/categories/:id', auth, createSubCategory);
// routerCategories.patch('/categories/:id', auth, updateCategory);


routerCategories.get('/categories', auth, getCategories);
// routerCategories.get('/categories/:id', auth, getCategoryById);

// routerMovies.delete('/movies/:movieId', auth, celebrate({
//   params: Joi.object().keys({
//     movieId: Joi.string().required().hex().length(24),
//   }),
// }), deleteMovieById);

module.exports = routerCategories;
