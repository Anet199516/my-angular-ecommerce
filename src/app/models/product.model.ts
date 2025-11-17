import { UserReviewModel } from './user-review.model';

export type ProductModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  rating: number; // e.g., 4.0
  reviewCount: number;
  inStock: boolean;
  category: string;
  reviews: UserReviewModel[];
};

export type FilterParams = {
  category: string;
  searchTerm?: string;
};
