export interface Voiture {
  id?: number;
  carName: string;
  brand: string;
  category: string;
  transmission: string;
  toit: string;
  carburant: string;
  price: number;
  featured: boolean;
  agence: string;
  local: string;
  agenceLogo: string;
  description: string;
  imgUrl?: string; // ✅ Base64 image string
  images: {     // Add this new property
    type: string;
    base64Data: string;
    id?: number;
    name?: string;
  }[];
  disponible: boolean;
  createdAt?: string; // ✅ Use string instead of Date (backend returns ISO string format)
  updatedAt?: string; // ✅ Use string instead of Date (same reason)
  reviews: Review[];

  photos?: Photo[];
  bookings?: Booking[];

  // ✅ Add missing properties
  image?: string;  // Stores the first image URL
  rating?: number; // Stores the calculated average rating
}

export interface Review {
  id?: number;
  rating: number;
  comment: string;
  userId?: number; // ✅ Add userId (useful for linking reviews)
  createdAt?: string; // ✅ Change to string (ISO format)
}

export interface Photo {
  id?: number;
  name?: string; // ✅ Add name for better management
  type?: string; // ✅ Add type (e.g., "image/png")
  displayUrl?: string; // ✅ URL for displaying images
  data?: string; // ✅ Base64 encoded string (keep optional)
}

export interface Booking {
  id?: number;
  userId?: number; // ✅ Add userId for reference
  startDate: string; // ✅ Change to string (backend returns ISO format)
  endDate: string; // ✅ Change to string (ISO format)
  status?: string; // ✅ Add status (e.g., "CONFIRMED", "CANCELED")
  pickupLocation?: string;
  dropoffLocation?: string;
}
