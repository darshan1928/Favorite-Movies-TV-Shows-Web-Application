const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const authSchema = require('../validations/auth.validation');
const authMiddleware = require('../middlewares/auth');
router.post('/signup', validate(authSchema.signup), authController.signup);
router.post('/login', validate(authSchema.login), authController.login);

///protected
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;
