const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');

// GET
router.get('/', controllerMock);
router.get('/retrospective', controllerMock);
router.get('/linkedinToken/', controllerMock);
router.get('/login', controllerMock);

// POST
router.post('/login', controllerMock);

module.exports = router;