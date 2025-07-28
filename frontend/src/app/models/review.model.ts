export interface Review {
  id: number;
  username: string;
  reviewText: string;
  rating: number;
  createdAt: string; // Keep as string since it's in ISO format
  updatedAt: string;
  carName?: string;
}
