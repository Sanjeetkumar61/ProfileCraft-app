const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  order: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true // <-- YAHAN CHANGE HUA HAI
  },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);