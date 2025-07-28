/*import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Client;
  private connected = new BehaviorSubject<boolean>(false);
  private notificationSubject = new BehaviorSubject<string | null>(null);
  private privateNotificationSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    this.connect();
  }

  private connect() {
    const socketUrl = 'http://localhost:8084/ws-booking'; // WebSocket endpoint
    this.stompClient = new Client({
      brokerURL: socketUrl,
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000, // Auto-reconnect after 5 seconds if disconnected
      heartbeatIncoming: 40000,
      heartbeatOutgoing: 40000,
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      this.connected.next(true);

      // ✅ Subscribe to public notifications
      this.stompClient.subscribe('/topic/notifications', (message: IMessage) => {
        this.notificationSubject.next(message.body);
      });

      // ✅ Subscribe to private notifications
      this.stompClient.subscribe('/user/queue/private', (message: IMessage) => {
        this.privateNotificationSubject.next(message.body);
      });
    };

    this.stompClient.onWebSocketClose = () => {
      console.log('WebSocket connection closed');
      this.connected.next(false);
    };

    this.stompClient.activate();
  }

  // ✅ Public notifications observable
  getNotifications(): Observable<string | null> {
    return this.notificationSubject.asObservable();
  }

  // ✅ Private notifications observable
  getPrivateNotifications(): Observable<string | null> {
    return this.privateNotificationSubject.asObservable();
  }

  // ✅ Send a message to the WebSocket server
  sendNotification(message: string) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/notify',
        body: message,
      });
    } else {
      console.error('WebSocket is not connected');
    }
  }
}*/
