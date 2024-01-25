import express from 'express';
const router = express.Router();

const authController = require('./../controllers/auth.controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;