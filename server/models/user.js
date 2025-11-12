const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  education: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  location: { type: String, default: '' },
  resumeUrl: { type: String, default: '' }, // <-- YEH NAYI FIELD ADD HUI HAI
  social: {
    github: String,
    linkedin: String,
    portfolio: String,
  }
}, { timestamps: true });

// Match password method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);