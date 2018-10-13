const router = require('express').Router();

const controllerMock = require('../mocks/controllerMock');
const listController = require('../controllers/list.controller');

// GET
router.get('/:id', listController.get);

// POST
router.post('/', listController.create);

// PATCH
router.patch('/:id', controllerMock);

// DELETE
router.delete('/:id', controllerMock);

module.exports = router;