const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/autherror');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: false, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },
  
  email: {
    type: String,
    unique: true,
    required: [true, 'Ваш email'],
    validate: [validator.isEmail, 'Неверный email'],
  },
  password: {
    type: String,
    required: [true, 'Пароль'],
    select: false,
  },
}, {
  versionKey: false, // You should be aware of the outcome after set to false
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Email или пароль не верны'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Email или пароль не верны'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
