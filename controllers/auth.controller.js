const authController = {};
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const JwtHelpers = require('../JWT/JWT');
const logger = require('../logger/logger');
const authConfig = require('../configs/auth.config');

authController.signUp = async (req, res) => {
  const {
    username, email, password, remember,
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { msg } = errors.array({ onlyFirstError: true })[0];
    return res.status(400).json({ error: msg });
  }

  const user = new User({ username, email, password });

  await user.save();

  const expiresIn = remember ? authConfig.prolongedExpiresIn : authConfig.expiresIn;

  logger.info(`User created ${user}`);
  const { _id: id, username: name, email: mail } = user;
  req.session.token = await JwtHelpers.generateToken(id, expiresIn);

  return res.status(201).json({ username: name, email: mail, id });
};

authController.singIn = (req, res) => {
  const { email, password, remember } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { msg } = errors.array({ onlyFirstError: true })[0];
    return res.status(400).json({ error: msg });
  }

  User.findOne({ email }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      const {
        _id: id, username, email: mail, password: hash,
      } = user;
      const validatePassword = await bcrypt.compare(password, hash);
      if (!validatePassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const expiresIn = remember ? authConfig.prolongedExpiresIn : authConfig.expiresIn;
      req.session.token = await JwtHelpers.generateToken(id, expiresIn);
      return res.status(200).json({ id, username, email: mail });
    }
    return res.status(404).json({ error: 'User with this email not found' });
  });
};

authController.logout = (req, res) => {
  req.session.token = null;
  return res.status(200).json({ message: 'Successfully logged out' });
};

module.exports = authController;
