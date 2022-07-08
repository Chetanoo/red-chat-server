const express = require('express');
const { body } = require('express-validator');
const authenticate = require('../middlewares/authenticate');
const messagesController = require('../controllers/messages.controller');

const messagesRouter = express.Router();

messagesRouter.post(
  '/create',
  [
    authenticate,
    body('text')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Text is required')
      .bail()
      .isLength({ max: 200 })
      .withMessage('Text cannot be more then 200 symbols'),
  ],
  messagesController.create,
);

module.exports = messagesRouter;
