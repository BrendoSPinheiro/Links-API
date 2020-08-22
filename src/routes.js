const { Router } = require('express');
const UserController = require('./app/controllers/UserController');

const router = Router();

// User Routes
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.delete('/users/:id', UserController.delete);

// Link Routes

module.exports = router;
