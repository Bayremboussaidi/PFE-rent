export interface Booking {
  id: number;
  userId: number;
  username: string;
  carName: string;
  userEmail: string;
  nbrJrs: number;
  phone: string;
  description: string;
  startDate:  Date | string;
  endDate:  Date | string;
  status: string;
  pickupLocation: string;
  dropoffLocation: string;
  formattedDate?: string; //  Add this to avoid TypeScript errors
  price?: number;
}






export interface BookingEmail {
  id: number;
  voitureId: number;
  userId: number;
  username: string;
  carName: string;
  userEmail: string;
  nbrJrs: number;
  phone: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  status: string;
  pickupLocation: string;
  dropoffLocation: string;
  formattedDate?: string;
  price?: number;
  base64Data: string;     // From API response
  type: string;           // From API response
  imageSrc: string;       // From API response
  imgUrl?: string;        // Add this computed property

}

