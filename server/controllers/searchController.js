const Project = require('../models/project');
const Skill = require('../models/skill');
const User = require('../models/user'); // 'Profile' model ki jagah 'User' model import karein

exports.search = async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json({ projects: [], skills: [], profile: null });

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    // Sabhi queries mein 'user: req.user._id' add karein taaki sirf user ka apna data search ho
    const [projects, skills, userProfile] = await Promise.all([
      Project.find({ user: req.user._id, $or: [{ title: regex }, { description: regex }, { tech: regex }] }).sort({ createdAt: -1 }).limit(50),
      Skill.find({ user: req.user._id, name: regex }).sort({ order: 1 }).limit(50),
      // Ab 'User' model mein search karein
      User.findOne({ _id: req.user._id, $or: [{ name: regex }, { bio: regex }] }).select('-password')
    ]);

    // Response mein 'userProfile' ko 'profile' ke roop mein bhejein
    res.json({ projects, skills, profile: userProfile });
  } catch (err) {
    next(err);
  }
};