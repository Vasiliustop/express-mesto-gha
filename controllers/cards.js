const Card = require('../models/card');

module.exports.getCard = (_req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.send(card))
    .catch(() => {
      res.status(500).send({ message: 'error' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'incorrect data' });
      }
      return res.status(500).send({ message: 'error' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'card is not found' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'incorrect id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере, попробуйте еще раз' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Введен некорректый id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере, попробуйте еще раз' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Введен некорректый id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере, попробуйте еще раз' });
    });
};
