const routerProduct = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const controller = require('../controllers/product');
const {
  getProducts,
  createProduct,
  // deleteMovieById,
} = require('../controllers/product');

routerProduct.get('/categories/products/:id', auth, getProducts);

routerProduct.post('/categories/products/:id', auth, createProduct);

// router.patch('/:id', auth, controller.update);
// router.delete('/:id', auth, controller.remove);

module.exports = routerProduct;
