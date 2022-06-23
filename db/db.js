const mongoose = require('mongoose');
const dbConfig = require('../configs/db.config');
const logger = require('../logger/logger');

async function connectDb() {
  try {
    await mongoose.connect(`${dbConfig.URI}${dbConfig.dbName}`);
  } catch (e) {
    logger.error(e);
  }
}

module.exports = connectDb;
