const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  nameRU: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  nameEN: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  country: { // страна создания фильма
    type: String, // имя — это строка
    required: true,
  },
  director: { // Режисёр
    type: String, //
    required: true,
  },
  year: { //
    type: String, //
    required: true,
  },
  duration: {
    type: String, //
    required: true,
  },
  description: { //
    type: String, //
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String, // описание — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String, // описание — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // тип — String
    //   required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false, // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('movie', movieSchema);
