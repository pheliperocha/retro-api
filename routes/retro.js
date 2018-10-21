const router = require('express').Router();

const retroController = require('../controllers/retro.controller');

// GET
router.get('/:id', retroController.get);
router.get('/pincode/:pin', retroController.getByPin);
router.get('/:id/lists', retroController.getLists);
router.get('/:id/cards', retroController.getCards);
router.get('/:id/users', retroController.getFacilitator);

// POST
router.post('/', retroController.create);
router.post('/:id/members', retroController.addMember);

// PATCH
router.patch('/:id', retroController.update);
router.patch('/:id/lists/positions', retroController.sortLists);
router.patch('/:id/cards/positions', retroController.sortCards);

// DELETE
router.delete('/:retroId/members/:userId', retroController.removeMember);

module.exports = router;