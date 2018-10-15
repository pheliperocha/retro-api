const router = require('express').Router();

const controllerMock = require('../mocks/controllerMock');
const templateController = require('../controllers/template.controller');

// GET
router.get('/', templateController.getAll);
router.get('/:id', controllerMock);

// POST
router.post('/', controllerMock);

// PATCH
router.patch('/:id', controllerMock);

// DELETE
router.delete('/:id', controllerMock);

module.exports = router;