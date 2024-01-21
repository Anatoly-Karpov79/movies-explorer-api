const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const controller = require('../controllers/position');

router.get('/:categoryId', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
}), controller.getByCategoryId);
router.post('/', auth, controller.create);
router.patch('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
