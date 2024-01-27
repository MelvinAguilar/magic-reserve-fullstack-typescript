import express from 'express';
const router = express.Router();

const tourController = require('../controllers/tour.controller');
const authController = require('./../controllers/auth.controller');
const reviewRouter = require('./../routes/review.router');

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.authenticate, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.authenticate,
    authController.authorization('admin'),
    tourController.deleteTour,
  );

module.exports = router;
