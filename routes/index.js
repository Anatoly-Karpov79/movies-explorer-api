const router = require('express').Router();
const routerCategories = require('./categories');
const routerSubCategories = require('./subcategories');
const routerUsers = require('./users');
const routerProduct = require('./product')
const NotFoundError = require('../errors/notfounderror');

router.use(routerUsers);
router.use(routerCategories);
router.use(routerSubCategories);
router.use(routerProduct);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

module.exports = router;
