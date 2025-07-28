import { Review } from "./review.model";

export interface ApiResponseAgence {
  success: boolean;
  message: string;
  data: Voiture[];
}






export interface Voiture {
  id: number;
  carName: string;
  brand: string;
  category: string;
  transmission: string;
  toit: string;
  carburant: string;
  price: number;
  disponible: boolean;
  agence: string;
  local: string;
  createdAt: string;
  updatedAt: string;
  images: CarImage[];
  reviews?: Review[];
  rating?: number;
}

interface CarImage {
  id: number;
  type: string;
  base64Data: string;
}
