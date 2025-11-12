const Skill = require('../models/skill');

exports.listSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ user: req.user._id }).sort({ order: 1 });
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create({ ...req.body, user: req.user._id });
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, user: req.user._id });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found or user not authorized' });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSkill);
  } catch (err) {
    next(err);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found or user not authorized' });
    }
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    next(err);
  }
};