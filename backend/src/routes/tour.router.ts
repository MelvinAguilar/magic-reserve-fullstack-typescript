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

router
  .route('/monthly-plan/:year')
  .get(
    authController.authenticate,
    authController.authorization('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.authenticate,
    authController.authorization('admin', 'lead-guide'),
    tourController.createTour,
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.authenticate,
    authController.authorization('admin', 'lead-guide'),
    tourController.updateTour,
  )
  .delete(
    authController.authenticate,
    authController.authorization('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
