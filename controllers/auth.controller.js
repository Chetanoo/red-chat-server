const authController = {};
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const JwtHelpers = require('../JWT/JWT');
const logger = require('../logger/logger');

authController.signUp = async (req, res) => {
  const {
    username, email, password, remember,
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const user = new User({ username, email, password });

  await user.save();

  const expiresIn = remember ? authController.prolongedExpiresIn : authController.expiresIn;

  req.session.token = await JwtHelpers.generateToken(user, expiresIn);

  logger.info(`User created ${user}`);
  return res.status(201).json({ username: user.username, email: user.email, id: user._id });
};

authController.singIn = (req, res) => {
  const { email, password } = req.body;
};

authController.logout = (req, res) => {
  const { username, email, password } = req.body;
};

module.exports = authController;
