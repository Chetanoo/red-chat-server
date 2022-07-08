const { isEmail } = require('validator');

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger');
const authConfig = require('../configs/auth.config');

const userSchema = Schema({
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
    user.password = await bcrypt.hash(user.password, authConfig.HASH_ROUNDS);
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

userSchema.on('error', (error, next) => {
  logger.error(error);
  next();
});

const User = model('User', userSchema);

module.exports = User;
