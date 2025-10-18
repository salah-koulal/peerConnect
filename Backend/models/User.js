// models/User.js
// Mongoose User model with password hashing and helper methods.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email:    { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // will store hashed password
    subjects: { type: [String], default: [] },  // ['math', 'cs']
    location: { type: String, default: '' },
    groups:   { type: [mongoose.Schema.Types.ObjectId], default: [] }, // references to Group ids (if you add groups collection)
  },
  { timestamps: true }
);

// Hash password before saving (only when modified)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method: compare plain password with hashed
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Optional: return a clean object without password
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
