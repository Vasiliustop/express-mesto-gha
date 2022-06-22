// const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUserMe,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users/me', getUserMe); // получить свой профиль
usersRouter.get('/users', getUsers); // получить всех пользователей
usersRouter.get('/users/:userId', getUser); // получить пользователя по id
usersRouter.patch('/users/me', updateUserInfo); // обновить свой профиль
usersRouter.patch('/users/me/avatar', updateUserAvatar); // обновить аватар

module.exports = usersRouter;