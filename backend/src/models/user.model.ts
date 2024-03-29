const validator = require('validator');
const bcrypt = require('bcryptjs');
import crypto from 'crypto';
import mongoose, { Model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  photo: string;
  role: string;
  favoriteTours: mongoose.Schema.Types.ObjectId[];
  password: string;
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  active: boolean;
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
    enum: ['user', 'guide', 'admin', 'lead-guide'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  favoriteTours: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
    },
  ],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

/*
 * Middleware to encrypt the password before saving the user to the database.
 */
userSchema.pre('save', async function (next) {
  // If password was not modified, then continue
  if (!this.isModified('password')) return next();

  // Hash password
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

/*
 * Middleware to hide the passwordChangedAt property when the user is returned.
 */
userSchema.pre('save', async function (next) {
  // If the password was not modified or the document is new, then continue
  if (!this.isModified('password') || this.isNew) return next();

  // Set the passwordChangedAt property to the current time minus 1 second
  this.passwordChangedAt = new Date(Date.now() - 1000);

  next();
});

/*
 * Middleware to filter out inactive users.
 */
userSchema.pre(/^find/, function (this: Model<IUser>, next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

/*
 * Middleware to verify if the passwords match.
 */
userSchema.methods.correctPassword = async function (
  candidatePassword: any,
  userPassword: any,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/*
 * Middleware to verify if the password was changed after the token was issued.
 */
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

/*
 * Middleware to generate a password reset token.
 */
userSchema.methods.createPasswordResetToken = function () {
  // Generate a random token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Encrypt the token and store it in the database
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set the password reset token expiry time to 20 minutes
  this.passwordResetExpires = Date.now() + 20 * 60 * 1000;

  // Return the unencrypted token
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
