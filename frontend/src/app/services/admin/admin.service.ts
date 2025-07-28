import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8084/api/admin'; // Adjust based on your backend
  private tokenKey = 'access_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      tap((response: any) => {
        // Tokens or user info can be processed here if needed
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }







  getCurrentAdmin(): { username: string; email: string } | null {
    const stored = localStorage.getItem('admin_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          username: parsed.username,
          email: parsed.email
        };
      } catch (error) {
        console.error('Erreur parsing admin_auth:', error);
        return null;
      }
    }
    return null;
  }


  isLoggedIn(): boolean {
    const admin = this.getCurrentAdmin();
    return !!admin && !!admin.username && !!admin.email;
  }
}
