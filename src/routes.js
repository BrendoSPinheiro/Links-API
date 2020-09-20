const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const LinkController = require('./app/controllers/LinkController');
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middlewares/authMiddleware');

const router = Router();

// User Routes
router.post('/users', UserController.store);
router.put('/users/:id', authMiddleware, UserController.update);
router.get('/users', UserController.index);

// Link Routes
router.get('/links', authMiddleware, LinkController.index);
router.get('/links/:id', authMiddleware, LinkController.show);
router.post('/links', authMiddleware, LinkController.store);
router.put('/links/:id', authMiddleware, LinkController.update);
router.delete('/links/:id', authMiddleware, LinkController.delete);

// Session rote
router.post('/session', SessionController.store);

module.exports = router;
