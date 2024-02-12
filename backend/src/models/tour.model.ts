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
  startLocation: {
    type: string;
    coordinates: number[];
    address: string;
    description: string;
  };
  locations: {
    type: string;
    coordinates: number[];
    address: string;
    description: string;
    day: number;
  }[];
  guides: mongoose.Schema.Types.ObjectId[];
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
      default: 0,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val: number) => Math.round(val * 10) / 10, // Round the value to 1 decimal place
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
        validator: function (this: any, val: number) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
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
    // Start location for the tour
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'], // Only 'Point' is supported
      },
      coordinates: [Number], // Longitude (E/W), Latitude (N/S)
      address: String, // Address of the location
      description: String, // Description of the location
    },
    // Locations covered by the tour
    locations: [
      {
        // GeoJSON
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'], // Only 'Point' is supported
        },
        coordinates: [Number], // Longitude (E/W), Latitude (N/S)
        address: String, // Address of the location
        description: String, // Description of the location
        day: Number, // Day on which the location is visited
      },
    ],
    // Guides for the tour
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Set options for toJSON and toObject
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for the tour schema to improve the performance of frequently used queries but at the cost of slower writes
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// Virtual property to calculate the duration in weeks without storing it in the database
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Virtual populate the tour with the reviews to avoid embedding the reviews in the tour
tourSchema.virtual('reviews', {
  ref: 'Review', // Name of the model to link to
  foreignField: 'tour', // Name of the field in the Review model
  localField: '_id', // Name of the field in the Tour model
});

// This middleware is used to create a slug for the tour when it is saved
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// This middleware is used to hide secret tours from the query results (find
tourSchema.pre(/^find/, function (next) {
  (this as Query<any, any>).find({ secretTour: { $ne: true } });

  (this as any).start = Date.now();
  next();
});

// This middleware is used to calculate the time taken for the query to execute
tourSchema.post(/^find/, function (_docs, next) {
  console.log(`Query took ${Date.now() - (this as any).start} milliseconds!`);
  next();
});

// This middleware is used to populate the tour with the guides
tourSchema.pre(/^find/, function (next) {
  (this as Query<any, any>).populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });

  next();
});

// This middleware is used to populate the tour with the guides
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

// Create the Tour model
const Tour = mongoose.model('Tour', tourSchema);

// Export the Tour model
module.exports = Tour;
