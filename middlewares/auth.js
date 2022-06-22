const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { cookies } = req;

  if (!cookies) {
    return res.status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(res.status(401).send({ message: 'Необходима авторизация' }));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};