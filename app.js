const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(bodyParser.json());

app.use((req, _res, next) => {
  req.user = {
    _id: '62a22b61a96662274b22d968', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(require('./routes/users'));

// app.use(require('./routes/cards'));

app.all('*', (_req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`сервер запущен ${PORT}`);
});
