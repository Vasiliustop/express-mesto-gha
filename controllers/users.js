const User = require('../models/user');

module.exports.getUsers = (_req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => {
      res.status(500).send({ message: 'error' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'user is not found' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'incorrect id' });
      }
      return res.status(500).send({ message: 'error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'incorrect data' });
      }
      return res.status(500).send({ message: 'error' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'user is not found' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'incorrect data' });
      }
      return res.status(500).send({ message: 'error' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'error' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'incorrect data' });
      }
      return res.status(500).send({ message: 'error' });
    });
};