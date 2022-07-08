const messagesController = {};
const { validationResult } = require('express-validator');
const Message = require('../models/message.model');
const logger = require('../logger/logger');

messagesController.create = async (req, res) => {
  const {
    text,
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { msg } = errors.array({ onlyFirstError: true })[0];
    return res.status(400).json({ error: msg });
  }

  const message = new Message({ text });

  await message.save();

  logger.info(`Message created ${message}`);
  const { _id: id, text: messageText } = message;

  return res.status(201).json({ text: messageText, id });
};

module.exports = messagesController;
