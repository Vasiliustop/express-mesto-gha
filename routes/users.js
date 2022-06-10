const userRouter = require('express').Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUserInfo);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;