import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  data?: any;
  suggestions?: string[];
}

interface ChatResponse {
  response: string;
  confidence: number;
  data?: any;
  suggestions?: string[];
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isLoading: boolean = false;
  isOpen: boolean = false;
  userId: string = 'user123'; // In real app, get from auth service

  private chatbotUrl = 'http://localhost:8000'; // AI service URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Add welcome message
    this.addBotMessage('Hello! I\'m your car rental assistant. How can I help you today?', [
      'Show me available cars',
      'What are your prices?',
      'Help me with booking'
    ]);
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(): void {
    if (!this.currentMessage.trim()) return;

    const userMessage = this.currentMessage;
    this.addUserMessage(userMessage);
    this.currentMessage = '';
    this.isLoading = true;

    // Send to chatbot API
    this.http.post<ChatResponse>(`${this.chatbotUrl}/chat`, {
      message: userMessage,
      user_id: this.userId
    }).subscribe({
      next: (response) => {
        this.addBotMessage(response.response, response.suggestions, response.data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Chatbot error:', error);
        this.addBotMessage('Sorry, I\'m having trouble connecting right now. Please try again later.');
        this.isLoading = false;
      }
    });
  }

  sendSuggestion(suggestion: string): void {
    this.currentMessage = suggestion;
    this.sendMessage();
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    });
  }

  private addBotMessage(text: string, suggestions?: string[], data?: any): void {
    this.messages.push({
      id: Date.now().toString(),
      text,
      isUser: false,
      timestamp: new Date(),
      data,
      suggestions
    });
  }

  // Helper method to format voiture data
  formatVoitureData(voitures: any[]): string {
    if (!voitures || voitures.length === 0) return '';
    
    return voitures.map(voiture => 
      `${voiture.brand} ${voiture.carName} - ${voiture.price}€/day (${voiture.local})`
    ).join('\n');
  }

  // Helper method to format agency data
  formatAgencyData(agencies: any[]): string {
    if (!agencies || agencies.length === 0) return '';
    
    return agencies.map(agency => 
      `${agency.agencyName} - ${agency.city} (${agency.phoneNumber})`
    ).join('\n');
  }
}
