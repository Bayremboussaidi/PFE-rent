import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  private apiUrl = 'http://localhost:8084/followers'; // Update port if different

  constructor(private http: HttpClient) { }

  addFollower(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email });
  }
}
