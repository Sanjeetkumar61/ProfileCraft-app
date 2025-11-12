const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, projectsController.listProjects);
// Single project route should also be protected
// router.get('/:id', protect, projectsController.getProject);

router.post('/', protect, projectsController.createProject);
router.put('/:id', protect, projectsController.updateProject);
router.delete('/:id', protect, projectsController.deleteProject);

module.exports = router;