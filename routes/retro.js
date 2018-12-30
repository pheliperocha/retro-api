const router = require('express').Router();

const retroController = require('../controllers/retro.controller');
const auth = require('../middlewares/auth');

// GET
router.get('/:id', auth, retroController.get);
router.get('/pincode/:pin', retroController.getByPin);
router.get('/:id/lists', auth, retroController.getLists);
router.get('/:id/cards', retroController.getCards);
router.get('/:id/users', retroController.getFacilitator);

// POST
router.post('/', auth, retroController.create);
router.post('/:id/members', retroController.addMember);

// PATCH
router.patch('/:id', retroController.update);
router.patch('/:id/lists/positions', retroController.sortLists);
router.patch('/:id/cards/positions', retroController.sortCards);

// DELETE
router.delete('/:retroId/members/:userId', retroController.removeMember);

module.exports = router;