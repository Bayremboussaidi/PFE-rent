
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/Notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  private apiUrl = 'http://localhost:8084/notification';

  constructor(private http: HttpClient) {}

  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification);
  }


  getNotificationsByRecipient(recipient: string): Observable<Notification[]> {
    console.log('API call to fetch notifications for recipient:', recipient);
    return this.http.get<Notification[]>(`${this.apiUrl}/recipient/${recipient}`);
  }
}
