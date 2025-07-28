import { Review } from "./review.model";

export interface User {
  [x: string]: any;
  id?: number; // Ensure it's always a number
  username?: string;
  firstName?: string; // Required for Keycloak
  lastName?: string; // Required for Keycloak
  email?: string;
  password?: string;
  phone?: number | null;
  workplace?: string | null;
  photo?: string | null;
  role?: 'ADMIN' | 'USER' | 'AGENCE'; // Match Java enum
  createdAt?: Date | string;
  updatedAt?: Date | string;
  anonymous?: boolean;
  comments?: Review[];

  bearer?: string; // Only for front-end authentication
}
