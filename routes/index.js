const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./users.routes');
const messagesRouter = require('./messages.routes');

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/messages', messagesRouter);

module.exports = indexRouter;
