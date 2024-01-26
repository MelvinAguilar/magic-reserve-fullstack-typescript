import express from 'express';
const router = express.Router();

const authController = require('./../controllers/auth.controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.patch(
  '/update-password',
  authController.authenticate,
  authController.updatePassword,
);

router.patch(
  '/update-me',
  authController.authenticate,
  authController.updateMe,
);


router.route('/').get(authController.getAllUsers);

router.route('/:id').get(authController.getUser);

module.exports = router;
