const { isEmail } = require('validator');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger');
const authConfig = require('../configs/auth.config');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    });
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
