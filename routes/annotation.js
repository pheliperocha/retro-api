const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');

// GET
router.get('/:id', controllerMock);

// POST
router.post('/', controllerMock);
router.post('/:id/user', controllerMock);

// PATCH
router.patch('/', controllerMock);

// DELETE
router.delete('/:annotationId/user/:userId', controllerMock);

module.exports = router;