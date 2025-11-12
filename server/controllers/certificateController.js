const Certificate = require('../models/certificate');

exports.listCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id }).sort({ date: -1 });
    res.json(certificates);
  } catch (err) {
    next(err);
  }
};

exports.createCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.create({ ...req.body, user: req.user._id });
    res.status(201).json(certificate);
  } catch (err) {
    next(err);
  }
};

exports.updateCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({ _id: req.params.id, user: req.user._id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found or user not authorized' });
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCertificate);
  } catch (err) {
    next(err);
  }
};

exports.deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found or user not authorized' });
    }
    res.json({ message: 'Certificate deleted' });
  } catch (err) {
    next(err);
  }
};