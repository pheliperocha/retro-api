const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');
const userController = require('../controllers/user.controller');

// GET
router.get('/', controllerMock);
router.get('/retrospective', controllerMock);
router.get('/linkedinToken/', controllerMock);
router.get('/login', controllerMock);

// POST
router.post('/login', userController.login);

module.exports = router;