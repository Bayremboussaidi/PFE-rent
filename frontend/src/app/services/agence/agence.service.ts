import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Agence {
  id?: number;
  agencyName: string;
  email: string;
  phoneNumber: string;
  city: string;
  photo: string;
  password: string;
}

export interface AgenceResponse {
  id: number;
  agencyName: string;
  email: string;
  phoneNumber: string;
  city: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  private apiUrl = 'http://localhost:8084/api/agence';
  private authTokenKey = 'auth_token';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.authStatus.next(this.isLoggedIn());
  }

  // Authentication methods
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem(this.authTokenKey, response.token);
        localStorage.setItem('agency_data', JSON.stringify({
          id: response.id,
          agencyName: response.agencyName,
          email: response.email,
          role: 'AGENCE'
        }));
        this.authStatus.next(true);
      }),
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem('agency_data');
    this.authStatus.next(false);
    this.router.navigate(['/agence/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  // CRUD Operations
  createAgence(agenceData: FormData): Observable<AgenceResponse> {
    return this.http.post<AgenceResponse>(this.apiUrl, agenceData).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  getAllAgences(): Observable<AgenceResponse[]> {
    return this.http.get<AgenceResponse[]>(`${this.apiUrl}/all`);
  }




  getAgenceById(id: number): Observable<AgenceResponse> {
    return this.http.get<AgenceResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  updateAgence(id: number, updateData: Partial<Agence>): Observable<AgenceResponse> {
    return this.http.put<AgenceResponse>(`${this.apiUrl}/${id}`, updateData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  deleteAgence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  searchAgencies(query: string, page: number = 0, size: number = 10): Observable<PaginatedResponse<AgenceResponse>> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<AgenceResponse>>(`${this.apiUrl}/search`, {
      headers: this.getAuthHeaders(),
      params
    }).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.authTokenKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  }

  private handleError(error: any): void {
    if (error.status === 401) {
      this.logout();
    }
  }






  //chat requirement
  getAll(): Observable<AgenceResponse[]> {
    return this.http.get<AgenceResponse[]>(`${this.apiUrl}/all`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => throwError(() => this.handleError(error)))
    );
  }
}
