import mongoose, { Query } from 'mongoose';
const slugify = require('slugify');

interface ITour {
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  createdAt: Date;
  startDates: Date[];
  secretTour: boolean;
}

// Define the tour schema
const tourSchema = new mongoose.Schema<ITour>(
  {
    // Specify the name for the tour
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      maxlength: [40, 'Name must be 40 characters or less'],
      minlength: [10, 'Name must be 10 characters or more'],
    },
    // Slug for the tour
    slug: String,
    // Duration of the tour
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    // Maximum group size for the tour
    maxGroupSize: {
      type: Number,
      required: [true, 'Group size is required'],
    },
    // Difficulty level of the tour
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be easy, medium, or difficult',
      },
    },
    // Average ratings for the tour
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    // Number of ratings for the tour
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    // Price of the tour
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    // Discounted price for the tour
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(this: any, val: number) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    // Brief summary of the tour
    summary: {
      type: String,
      trim: true,
      required: [true, 'Summary is required'],
    },
    // Detailed description of the tour
    description: {
      type: String,
      trim: true,
    },
    // Cover image for the tour
    imageCover: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    // Images associated with the tour
    images: [String],
    // Date when the tour was created
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // Hide this field from the output
    },
    // Start dates for the tour
    startDates: [Date],
    // Indicator for secret tours
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Set options for toJSON and toObject
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// This middleware is used to create a slug for the tour when it is saved 
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// This middleware is used to hide secret tours from the query results (find
tourSchema.pre(/^find/, function(next) {
  (this as Query<any, any>).find({ secretTour: { $ne: true } });

  (this as any).start = Date.now();
  next();
});

// This middleware is used to calculate the time taken for the query to execute
tourSchema.post(/^find/, function(_docs, next) {
  console.log(`Query took ${Date.now() - (this as any).start} milliseconds!`);
  next();
});

// This middleware is used to populate the tour with the guides
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

// Create the Tour model
const Tour = mongoose.model('Tour', tourSchema);

// Export the Tour model
module.exports = Tour;
