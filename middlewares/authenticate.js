const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config');
const logger = require('../logger/logger');

async function authenticate(req, res, next) {
  const token = req.headers?.authorization;
  if (token) {
    await jwt.verify(token, jwtConfig.secret, (error, decoded) => {
      if (error) {
        logger.error(error);
        const { message } = error;
        return res.status(400).json({ error: message });
      }
      if (decoded) {
        next();
        return;
      }
      return res.status(403).json({ error: 'Unauthorized' });
    });
  } else {
    return res.status(403).json({ error: 'Unauthorized' });
  }
}

module.exports = authenticate;
