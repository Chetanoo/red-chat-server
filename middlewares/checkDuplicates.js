const User = require('../models/user.model');
const logger = require('../logger/logger');

const checkDuplicates = {};

checkDuplicates.email = async (email) => {
  await User.findOne({ email }).then((user) => {
    if (user) {
      return Promise.reject(Error('Email already in use.'));
    }
    return true;
  }).catch((err) => {
    logger.error(err);
    return Promise.reject(Error(err));
  });
};

checkDuplicates.username = async (username) => {
  await User.findOne({ username }).then((user) => {
    if (user) {
      return Promise.reject(Error('Username already in use.'));
    }
    return true;
  }).catch((err) => {
    logger.error(err);
    return Promise.reject(Error(err));
  });
};

module.exports = checkDuplicates;
