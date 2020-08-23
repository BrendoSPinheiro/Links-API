const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const LinkController = require('./app/controllers/LinkController');

const router = Router();

// User Routes
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.delete('/users/:id', UserController.delete);

// Link Routes
router.get('/links', LinkController.index);

module.exports = router;
