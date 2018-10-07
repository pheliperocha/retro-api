const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');

// GET
router.get('/', controllerMock);
router.get('/:id', controllerMock);

// POST
router.post('/', controllerMock);

// PATCH
router.patch('/:id', controllerMock);

// DELETE
router.delete('/:id', controllerMock);

module.exports = router;