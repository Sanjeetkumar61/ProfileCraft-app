const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, skillsController.listSkills);

router.post('/', protect, skillsController.createSkill);
router.put('/:id', protect, skillsController.updateSkill);
router.delete('/:id', protect, skillsController.deleteSkill);

module.exports = router;