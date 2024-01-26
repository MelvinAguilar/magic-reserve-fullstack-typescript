import express from 'express';
const router = express.Router();

const authController = require('./../controllers/auth.controller');
const userController = require('./../controllers/user.controller');

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
  userController.updateMe,
);

router.delete(
  '/delete-me',
  authController.authenticate,
  userController.deleteMe,
);

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser);

module.exports = router;
