const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Это поле обязательно для заполнения'],
      minlength: [2, 'В данном поле требуется минимум 2 символа'],
      maxlength: [30, 'В данном поле требуется максимум 30 символов'],
    },
    about: {
      type: String,
      required: [true, 'Это поле обязательно для заполнения'],
      minlength: [2, 'В данном поле требуется минимум 2 символа'],
      maxlength: [30, 'В данном поле требуется максимум 30 символов'],
    },
    avatar: {
      type: String,
      required: [true, 'Это поле обязательно для заполнения'],
    },
  },
);
module.exports = mongoose.model('user', userSchema);