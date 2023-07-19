const router = require('express').Router();
const routerMovies = require('./movies');
const routerUsers = require('./users');
const NotFoundError = require('../errors/notfounderror');

router.use(routerUsers);
router.use(routerMovies);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

module.exports = router;
