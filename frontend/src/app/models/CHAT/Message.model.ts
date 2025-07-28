import { Chat } from "./Chat.model";

export interface Message {
  messageId?: number;       // Optional as it's auto-generated
  senderEmail: string;
  content: string;          // Changed from 'replymessage' to match backend
  time: string;
  replyMessage?: Message;   // Proper camelCase if needed by backend
  chat?: Chat;              // To match backend relationship
}
