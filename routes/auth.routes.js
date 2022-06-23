const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const checkDuplicates = require('../middlewares/checkDuplicates');

const authRouter = express.Router();

authRouter.post(
  '/signup',
  [
    body('username').exists()
      .withMessage('Username is required')
      .bail()
      .custom((value) => checkDuplicates.email(value))
      .withMessage('Username already in use'),
    body('email')
      .exists().withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email')
      .bail()
      .custom((value) => checkDuplicates.email(value))
      .withMessage('email already in use'),
    body('password')
      .exists()
      .isLength({ min: 5, max: 99 })
      .withMessage('Password have to be at least 5 symbols'),
  ],
  authController.signUp,
);
authRouter.post('/signin', authController.singIn);
authRouter.post('/logout', authController.logout);

module.exports = authRouter;
