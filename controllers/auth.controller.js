const authController = {};
const { validationResult } = require('express-validator');
const User = require('../models/user.model');

authController.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = new User({ username, email, password });

  await user.save();

  return res.status(201).json({ username: user.username, email: user.email, id: user._id });
};

authController.singIn = (req, res) => {
  const { username, email, password } = req.body;
};

authController.logout = (req, res) => {
  const { username, email, password } = req.body;
};

module.exports = authController;
