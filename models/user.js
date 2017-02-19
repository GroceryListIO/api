const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
},
  {
    timestamps: true,
  },
);

// Pre-save of user to database, hash password if password is modified or new
userSchema.pre('save', (next) => {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (errHash, hash) => {
      if (errHash) return next(errHash);
      user.password = hash;
      return next();
    });
    return false;
  });
  return false;
});

// Method to compare password for login
userSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
