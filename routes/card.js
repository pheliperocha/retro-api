const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');

// GET
router.get('/', controllerMock);
router.get('/:id', controllerMock);

// POST
router.post('/', controllerMock);
router.post('/:id/vote', controllerMock);

// PATCH
router.patch('/:id', controllerMock);

// DELETE
router.delete('/:id', controllerMock);
router.delete('/:cardId/user/:userId', controllerMock);

module.exports = router;