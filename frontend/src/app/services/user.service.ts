import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Ensure correct import path
import { ApiResponse } from '../models/ApiResponse .model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8084/api/users'; // Adjust if needed

  constructor(private http: HttpClient) {}

  // ✅ Fetch all users (kept 'any[]' for safety if response format is inconsistent)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }



  //get user by id
  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  // ✅ Delete a user (unchanged since it's already correct)
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  // ✅ Update a user (kept 'any' for compatibility but ensured 'id' is number)
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${userId}`,
      userData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    );
  }

  // ✅ Create a user (kept 'any' for flexibility but used 'User' as return type)
  createUser(userData: User): Observable<User> {
    // Ensure proper content type
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.apiUrl, userData, { headers });
  }
}
