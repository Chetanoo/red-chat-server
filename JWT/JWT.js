const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config');

const JwtHelpers = {};

JwtHelpers.generateToken = async (id, expiresIn) => jwt.sign(
  { id },
  jwtConfig.secret,
  { expiresIn },
);
JwtHelpers.validateToken = async (token) => jwt.verify(token, jwtConfig.secret);

module.exports = JwtHelpers;
