const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: Date },
  imageUrl: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true // <-- YAHAN CHANGE HUA HAI
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Certificate', CertificateSchema);