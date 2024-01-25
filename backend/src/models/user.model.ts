const validator = require('validator');
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');

interface IUser {
  name: string;
  email: string;
  photo: string;
  role: string;
  password: string;
  passwordChangedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
});

// Encrypt password before saving to database
userSchema.pre('save', async function (next) {
  // If password was not modified, then continue
  if (!this.isModified('password')) return next();

  // Hash password
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: any,
  userPassword: any,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  // Return false if password was not changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
