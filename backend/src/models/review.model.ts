import mongoose, { Query, Model } from 'mongoose';

const Tour = require('./tour.model');

interface IReview {
  review: string;
  rating: number;
  createdAt: Date;
  tour: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  r?: IReview | null;
  calcAverageRatings: (tourId: string) => Promise<void>;
}

const reviewSchema = new mongoose.Schema<IReview, Model<IReview>>(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Prevent duplicate reviews
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Populate the user field with the user's name and photo
reviewSchema.pre(/^find/, function (next) {
  (this as Query<any, any>).populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// Static method to calculate the average rating and quantity of ratings for a tour
reviewSchema.statics.calcAverageRatings = async function (tourId: string) {
  const stats = await this.aggregate([
    {
      // filter by tour
      $match: { tour: new mongoose.Types.ObjectId(tourId) },
    },
    {
      // group by tour and calculate the average
      $group: {
        _id: '$tour', // group by tour
        nRating: { $sum: 1 }, // count the number of ratings
        avgRating: { $avg: '$rating' }, // calculate the average rating
      },
    },
  ]);

  // update the tour with the new calculated values, if there are any reviews for the tour
  // otherwise set the values to default
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

// Middleware to calculate the average rating and quantity of ratings for a tour after a review is created
reviewSchema.post('save', async function () {
  await (this.constructor as unknown as IReview).calcAverageRatings(
    this.tour.toString(),
  );
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  const currentDoc = await (this.model as any).findOne();

  if (currentDoc) {
    await currentDoc.constructor.calcAverageRatings(doc.tour);
  }
});

const Review = mongoose.model<IReview>('Review', reviewSchema);

module.exports = Review;
