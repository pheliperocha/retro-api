const router = require('express').Router();
const cardController = require('../controllers/card.controller');

// GET
router.get('/:id', cardController.get);

// POST
router.post('/', cardController.create);
router.post('/:id/votes', cardController.vote);

// PATCH
router.patch('/:id', cardController.update);

// DELETE
router.delete('/:id', cardController.delete);
router.delete('/:id/votes', cardController.unvote);

module.exports = router;