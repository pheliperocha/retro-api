const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');
const cardController = require('../controllers/card.controller');

// GET
router.get('/', controllerMock);
router.get('/:id', cardController.get);

// POST
router.post('/', cardController.create);
router.post('/:id/vote', controllerMock);

// PATCH
router.patch('/:id', cardController.update);

// DELETE
router.delete('/:id', cardController.delete);
router.delete('/:cardId/user/:userId', controllerMock);

module.exports = router;