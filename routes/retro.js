const router = require('express').Router();
const controllerMock = require('../mocks/controllerMock');

// GET
router.get('/:id', controllerMock);
router.get('/pincode/:pin', controllerMock);
router.get('/:id/list', controllerMock);
router.get('/:id/card', controllerMock);
router.get('/:id/user', controllerMock);

// POST
router.post('/', controllerMock);
router.post('/member', controllerMock);

// PATCH
router.patch('/:id', controllerMock);
router.patch('/:id/list/sort', controllerMock);
router.patch('/:id/card/sort', controllerMock);

// DELETE
router.delete('/:retroId/member/:userId', controllerMock);

module.exports = router;