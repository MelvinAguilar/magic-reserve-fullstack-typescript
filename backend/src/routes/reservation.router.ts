import express from 'express';
const router = express.Router();

const reservationController = require('../controllers/reservation.controller');
const authController = require('./../controllers/auth.controller');

router.use(authController.authenticate);

router.get('/my-reservations', reservationController.getMyReservations);

router
  .route('/')
  .get(
    authController.authorization('admin'),
    reservationController.getAllReservations,
  )
  .post(
    authController.authorization('user', 'admin'),
    reservationController.setReservationUserIds,
    reservationController.createReservation,
  );

router
  .route('/:id')
  .get(
    authController.authorization('admin'),
    reservationController.getReservation,
  )
  .patch(
    authController.authorization('admin'),
    reservationController.updateReservation,
  )
  .delete(
    authController.authorization('admin'),
    reservationController.deleteReservation,
  );

module.exports = router;
