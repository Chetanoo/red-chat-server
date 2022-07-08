const express = require('express');
const User = require('../models/user.model');
const authenticate = require('../middlewares/authenticate');

const userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', [authenticate], (req, res) => {
  User.find().exec((error, users) => res.status(302).json({ users }));
});

module.exports = userRouter;
