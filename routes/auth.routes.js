const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  authController.signUp,
);
authRouter.post('/signin', authController.singIn);
authRouter.post('/logout', authController.logout);

module.exports = authRouter;
