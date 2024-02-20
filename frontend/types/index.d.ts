export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface Tour {
  id: string;
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  currentGroupSize: number;
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
  reviews: any[];
}

export type User = {
  _id: string;
  email: string;
  role: string;
  name: string;
  photo?: string;
};

export type Reservations = {
  id: string;
  tours: {
    tour: {
      id: string;
      name: string;
      imageCover: string;
    };
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  total: number;
};

export type AddCartType = {
  id: string;
  name: string;
  price: number;
  quantity?: number | 1;
  summary?: string;
  imageCover: string;
  currentGroupSize?: number;
  maxGroupSize?: number;
};

export type CartType = {
  id: string;
  quantity?: number;
};

export interface DifficultyStats {
  _id: string;
  numTours: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  avgRating: number;
  numRatings: number;
}

export interface ToursStats {
  _id: null;
  totalUsers: number;
  totalReservations: number;
  totalTours: number;
  totalComments: number;
}

export interface ReservationsStats {
  _id: null;
  totalReservations: number;
  maxSpent: number;
}

export interface Stats {
  difficultyStats: DifficultyStats[];
  toursStats: ToursStats;
  reservationsStats: ReservationsStats;
}

export interface Reservation {
  _id: string;
  user: User;
  tours: {
    tour: {
      _id: string;
      name: string;
      guides: {
        _id: string;
        name: string;
        email: string;
        role: string;
        photo: string;
      }[];
      imageCover: string;
      durationWeeks: number;
      id: string;
    };
    quantity: number;
    unitPrice: number;
    subtotal: number;
    _id: string;
    id: string;
  }[];
  total: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
