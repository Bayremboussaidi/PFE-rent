export interface Notification {
  id?: number;
  recipient: string;
  message: string;
  seen: boolean;
  createdAt?: Date;
}
