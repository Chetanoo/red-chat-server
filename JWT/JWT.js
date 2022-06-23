const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config');
const logger = require('../logger/logger');

const JwtHelpers = {};

JwtHelpers.generateToken = async (user, expiresIn) => {
  let newToken;
  await jwt.sign(user, jwtConfig.secret, { algorithm: 'RS256', expiresIn }, (err, token) => {
    if (err) {
      logger.error(err);
    }
    newToken = token;
  });
  return newToken;
};
JwtHelpers.validateToken = () => {};

module.exports = JwtHelpers;
