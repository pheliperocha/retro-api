const router = require('express').Router();
const annotationController = require('../controllers/annotation.controller');

// POST
router.post('/', annotationController.create);
router.post('/:id/users', annotationController.addResponsible);

// DELETE
router.delete('/:annotationId/users/:userId', annotationController.removeResponsible);

module.exports = router;