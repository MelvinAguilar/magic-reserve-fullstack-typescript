import express from 'express';
const router = express.Router({ mergeParams: true });

const reviewController = require('../controllers/review.controller');
const authController = require('../controllers/auth.controller');

// Protect all routes after this middleware to require authentication
router.use(authController.authenticate);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.authenticate,
    authController.authorization('user', 'admin'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.authorization('user', 'admin'),
    reviewController.updateReview,
  )
  .delete(
    authController.authorization('user', 'admin'),
    reviewController.deleteReview,
  );

module.exports = router;
