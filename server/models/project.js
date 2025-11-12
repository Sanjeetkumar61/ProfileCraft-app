const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  repo: { type: String },
  tech: [String],
  imageUrl: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true // <-- YAHAN CHANGE HUA HAI
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);