const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const indexRouter = require('./routes/index');
const connectDb = require('./db/db');
const sessionConfig = require('./configs/session.config');
const errorHandler = require('./errorHandler/errorHandler');

const app = express();

connectDb();

app.use(cookieSession({
  name: 'session',
  keys: [sessionConfig.secret],

  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(errorHandler);

module.exports = app;
