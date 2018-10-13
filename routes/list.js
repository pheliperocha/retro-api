const router = require('express').Router();

const listController = require('../controllers/list.controller');

// GET
router.get('/:id', listController.get);

// POST
router.post('/', listController.create);

// PATCH
router.patch('/:id', listController.update);

// DELETE
router.delete('/:id', listController.delete);

module.exports = router;