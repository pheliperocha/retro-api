const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');
const userController = require('../controllers/user.controller');

const auth = require('../middlewares/auth');

// GET
router.get('/', auth, controllerMock);
router.get('/retros', auth, userController.getRetro);
router.get('/actions', auth, userController.getActions);
router.get('/linkedinToken/', controllerMock);
router.get('/login', userController.login);

// POST
router.post('/login', userController.login);

module.exports = router;