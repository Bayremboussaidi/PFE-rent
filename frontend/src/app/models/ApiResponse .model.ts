
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  // Add any other standard fields your API returns
}
