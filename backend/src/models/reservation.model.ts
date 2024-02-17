import mongoose, { Model, CallbackError, Query } from 'mongoose';
const AppError = require('./../utils/appError');
const Tour = require('./tour.model');

interface IReservation {
  user: mongoose.Schema.Types.ObjectId;
  tours: {
    tour: mongoose.Schema.Types.ObjectId;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  total: number;
}

const reservationSchema = new mongoose.Schema<
  IReservation,
  Model<IReservation>
>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Reservation must belong to a user'],
    },
    tours: [
      {
        tour: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tour',
          required: [true, 'Reservation must belong to a tour'],
        },
        quantity: {
          type: Number,
          required: [true, 'Reservation must have a quantity'],
        },
        unitPrice: {
          type: Number,
          required: [true, 'Reservation must have a unit price'],
        },
        subtotal: {
          type: Number,
          required: [true, 'Reservation must have a subtotal'],
        },
      },
    ],
    total: {
      type: Number,
      required: [true, 'Reservation must have a total'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Middleware to check if there are enough slots available for the tours in the reservation
reservationSchema.pre('save', async function (next) {
  try {
    const toursPromises: Promise<void>[] = this.tours.map(async (tourData) => {
      const tour = await Tour.findById(tourData.tour);
      if (!tour) throw new AppError('Tour not found', 404);

      if (
        tour.maxGroupSize <
        (tour.currentGroupSize || 0) + tourData.quantity
      ) {
        throw new AppError(
          `There are not enough slots available for tour "${tour.name}".`,
          400,
        );
      }
    });
    await Promise.all(toursPromises);

    const tourUpdates = this.tours.map((tourData) => ({
      updateOne: {
        filter: { _id: tourData.tour },
        update: { $inc: { currentGroupSize: tourData.quantity } },
      },
    }));
    await Tour.bulkWrite(tourUpdates);

    next();
  } catch (error) {
    next(error as AppError | CallbackError | undefined);
  }
});

// Middleware to update the currentGroupSize of the tours in the reservation
reservationSchema.pre<Query<any, any>>(
  'findOneAndUpdate',
  async function (next) {
    try {
      const updatedReservation = await this.findOne(this.getQuery()).clone();

      if (!updatedReservation) {
        throw new AppError('Reservation not found', 404);
      }

      const toursPromises = updatedReservation.tours.map(
        async (tourData: any) => {
          const tour = await Tour.findById(tourData.tour).clone();
          if (!tour)
            throw new AppError(`Tour with ID ${tourData.tour} not found`, 404);

          const quantityDifference =
            tourData.quantity -
            ((this.getUpdate() as IReservation).tours.find((t: any) =>
              tourData.tour.equals(t.tour),
            )?.quantity || 0);
          const totalReserved = tour.currentGroupSize - quantityDifference;

          if (totalReserved > tour.maxGroupSize) {
            throw new AppError(
              `There are not enough slots available for tour "${tour.name}".`,
              400,
            );
          }

          await Tour.findByIdAndUpdate(tour._id, {
            currentGroupSize: totalReserved,
          });
        },
      );

      await Promise.all(toursPromises);

      next();
    } catch (error) {
      next(error as AppError | CallbackError | undefined);
    }
  },
);

interface TourData {
  tour: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

reservationSchema.pre('findOneAndDelete', async function (next) {
  try {
    const reservation = await this.findOne(this.getQuery()).clone();
    if (!reservation) {
      throw new AppError('Reservation not found', 404);
    }

    const tourUpdates = reservation.tours.map((tourData: TourData) => ({
      updateOne: {
        filter: { _id: tourData.tour },
        update: { $inc: { currentGroupSize: -tourData.quantity } },
      },
    }));
    await Tour.bulkWrite(tourUpdates);

    next();
  } catch (error) {
    next(error as AppError | CallbackError | undefined);
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
