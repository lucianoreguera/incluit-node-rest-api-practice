const { Router } = require('express');
const authorsController = require('../controllers/authorsController');

const router = Router();

router.get('/authors', authorsController.index);

router.post('/authors', authorsController.save);

router.delete('/authors/:id', authorsController.delete);

router.put('/authors/:id', authorsController.update);

module.exports = router;
