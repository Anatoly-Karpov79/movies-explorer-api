const Product = require('../models/product');
const BadRequestError = require('../errors/badrequesterror');
// const NotFoundError = require('../errors/notfounderror');
// const ForbiddenError = require('../errors/forbiddenerror');

// const { ConnectionClosedEvent } = require('mongodb');

module.exports.getProducts = (req, res, next) => {
  const subcategoryId = req.params.id;
  const owner = req.user._id;
  console.log(subcategoryId)
  Product.find({
    "subcategory": subcategoryId,
    "owner": owner
  })
    // .strictPopulate(categoryId)

    .then((products) => {
      res.send(products);
    })
    .catch(next);
};

module.exports.createProduct = (req, res, next) => {
  const subcategory = req.params.id;
  const owner = req.user._id;
  const { name, cost, category } = req.body;
  console.log(req.body)
  console.log(req.params.id)

  Product.create({
    name,
    cost,
    category,
    subcategory,
    owner,
  })

    .then((products) => res.status(201).send(products))

    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};
