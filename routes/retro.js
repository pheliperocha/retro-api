const router = require('express').Router();

const controllerMock = require('../mocks/controllerMock');
const retroController = require('../controllers/retro.controller');

// GET
router.get('/:id', retroController.get);
router.get('/pincode/:pin', retroController.getByPin);
router.get('/:id/lists', retroController.getLists);
router.get('/:id/cards', retroController.getCards);
router.get('/:id/user', retroController.getFacilitator);

// POST
router.post('/', retroController.create);
router.post('/:id/member', retroController.addMember);

// PATCH
router.patch('/:id', retroController.update);
router.patch('/:id/lists/positions', retroController.sortLists);
router.patch('/:id/cards/positions', controllerMock);

// DELETE
router.delete('/:retroId/member/:userId', controllerMock);

module.exports = router;