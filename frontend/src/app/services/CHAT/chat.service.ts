import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../../models/CHAT/Chat.model';
import { Message } from '../../models/CHAT/Message.model';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private apiUrl = 'http://localhost:8084/api/chats';

  constructor(private http: HttpClient) {}



  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${email}`);
  }



  getCurrentUserEmailFromLocalStorage(): string | null {
    const adminAuth = localStorage.getItem('admin_auth');
    const agencyData = localStorage.getItem('agency_data');

    try {
      if (adminAuth) {
        const parsedAdmin = JSON.parse(adminAuth);
        return parsedAdmin.email || null;
      } else if (agencyData) {
        const parsedAgency = JSON.parse(agencyData);
        return parsedAgency.email || null;
      }
    } catch (e) {
      console.error('Failed to parse user data from localStorage:', e);
      return null;
    }

    return null; // No user found
  }







  // Changed parameter type to number
  getChatById(chatId: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.apiUrl}/${chatId}`);
  }

  getChatByFirstUserEmailAndSecondUserEmail(first: string, second: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(
      `${this.apiUrl}/getChatByFirstUserEmailAndSecondUserEmail?firstUserEmail=${first}&secondUserEmail=${second}`
    );
  }

  // Changed parameter type to string (email can't be null)
  getChatByFirstUserEmailOrSecondUserEmail(email: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/getChatByFirstUserEmailOrSecondUserEmail/${email}`);
  }

  createChatRoom(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}/add`, chat);
  }

  // Changed chatId type to number
  updateChat(message: Message, chatId: number): Observable<Chat> {
    return this.http.put<Chat>(`${this.apiUrl}/message/${chatId}`, message);
  }

  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/all`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allUSERS`);
  }
}
