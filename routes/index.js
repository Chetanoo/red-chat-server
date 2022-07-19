const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./users.routes');

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);

module.exports = indexRouter;
