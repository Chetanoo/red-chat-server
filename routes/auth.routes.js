const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const checkDuplicates = require('../middlewares/checkDuplicates');

const authRouter = express.Router();

authRouter.post(
  '/signup',
  [
    body('username')
      .exists()
      .not()
      .isEmpty()
      .trim()
      .withMessage('Username is required')
      .bail()
      .isLength({ min: 1, max: 99 })
      .withMessage('Username has to be at least 1 symbol')
      .bail()
      .custom((value) => checkDuplicates.email(value))
      .withMessage('Username already in use'),
    body('email')
      .exists()
      .not()
      .isEmpty()
      .trim()
      .withMessage('Email is required')
      .bail()
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
authRouter.post(
  '/signin',
  [
    body('email')
      .exists()
      .not()
      .isEmpty()
      .trim()
      .withMessage('Email is required')
      .bail()
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Password is required'),
  ],
  authController.singIn,
);
authRouter.get('/logout', authController.logout);

module.exports = authRouter;
