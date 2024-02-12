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

export type AddCartType = {
  id: string;
  name: string;
  price: number;
  quantity?: number | 1;
  summary?: string;
  imageCover: string;
};

export type CartType = {
  id: string;
  quantity?: number;
};
