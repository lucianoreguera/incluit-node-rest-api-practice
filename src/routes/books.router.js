const { Router } = require('express');
const booksController = require('../controllers/booksController');

const router = Router();

router.get('/books', booksController.index);

router.post('/books', booksController.save);

router.delete('/books/:id', booksController.delete);

router.put('/books/:id', booksController.update);

module.exports = router;