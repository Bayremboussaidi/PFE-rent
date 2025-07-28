export interface ReportRequest {
  name: string;
  email: string;
  message: string;
  qrCode?: string; // Optional QR code
  attachment?: any; // Optional attachment (Jasper Report)
}
