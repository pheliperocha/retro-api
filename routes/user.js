const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');
const userController = require('../controllers/user.controller');

// GET
router.get('/', controllerMock);
router.get('/retro', userController.getRetro);
router.get('/actions', userController.getActions);
router.get('/linkedinToken/', controllerMock);
router.get('/login', controllerMock);

// POST
router.post('/login', userController.login);

module.exports = router;