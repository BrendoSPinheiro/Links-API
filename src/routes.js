const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const LinkController = require('./app/controllers/LinkController');

const router = Router();

// User Routes
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// Link Routes
router.get('/links', LinkController.index);
router.get('/links/:id', LinkController.show);
router.post('/links', LinkController.store);
router.put('/links/:id', LinkController.update);
router.delete('/links/:id', LinkController.delete);

module.exports = router;
