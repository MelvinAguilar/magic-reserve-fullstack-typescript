import mongoose, { Query } from 'mongoose';
const Tour = require('./tour.model');

interface IReview {
  review: string;
  rating: number;
  createdAt: Date;
  tour: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}

const reviewSchema = new mongoose.Schema<IReview>(
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
  const stats = await (this as mongoose.Model<IReview>).aggregate([
    {
      // filter by tour
      $match: { tour: tourId },
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
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
}

// Middleware to calculate the average rating and quantity of ratings for a tour after a review is created  
reviewSchema.post('save', function () {
  // @ts-ignore
  (this.constructor as mongoose.Model<IReview>).calcAverageRatings(this.tour);
});

// Middleware to calculate the average rating and quantity of ratings for a tour after a review is updated or deleted
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // @ts-ignore
  this.r = await this.findOne();
  next();
});

// Middleware to calculate the average rating and quantity of ratings for a tour after a review is updated or deleted
reviewSchema.post(/^findOneAnd/, async function () {
  // @ts-ignore
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
