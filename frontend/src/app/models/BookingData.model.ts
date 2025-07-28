export interface BookingData {
  id: number;
  userId: number;
  username: string;
  carName: string;
  userEmail: string;
  nbrJrs: number;
  phone: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  bookingStatus: string; //  Make sure bookingStatus is included
  pickupLocation: string;
  dropoffLocation: string;
  formattedDate?: string; // Optional for UI display
  price?: number;
}
