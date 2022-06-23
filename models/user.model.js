const { isEmail } = require('validator');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger');
const authConfig = require('../configs/auth.config');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: [true, 'Username already in use.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email already in use.'],
    validate: [isEmail, 'Invalid email.'],
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

userSchema.pre('save', async function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }
  try {
    await bcrypt.hash(user.password, authConfig.HASH_ROUNDS, (err, hash) => {
      if (err) {
        logger.error(err);
        next(err);
      }
      user.password = hash;
      user.save();
    });
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

userSchema.on('error', (error, next) => {
  logger.error(error);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
