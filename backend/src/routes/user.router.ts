import express from 'express';
const router = express.Router();

const authController = require('./../controllers/auth.controller');
const userController = require('./../controllers/user.controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// Protect all routes after this middleware to require authentication
router.use(authController.authenticate);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/update-password', authController.updatePassword);
router.patch('/update-me', userController.updateMe);
router.delete('/delete-me', userController.deleteMe);
router.get('/my-reservations', userController.getMyReservations);

router.patch('/toggle-favorite-tour/:id', userController.toggleFavoriteTour);

// Restrict all routes after this middleware to admin users only
router.use(authController.authorization('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
