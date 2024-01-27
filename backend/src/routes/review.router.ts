import express from 'express';
const router = express.Router();

const reviewController = require('../controllers/review.controller');
const authController = require('../controllers/auth.controller');

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.authenticate,
    authController.authorization('user', 'admin'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router.route('/:id').get(reviewController.getReview);

module.exports = router;
