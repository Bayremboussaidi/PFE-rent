import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailRequest } from '../models/emailRequest.model';
import { ReportRequest } from '../models/ReportRequest.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Existing methods
  sendEmail(emailRequest: EmailRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/email/send`, emailRequest);
  }

  informEmail(emailRequest: EmailRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/email/inform`, emailRequest);
  }

  sendReportEmail(reportRequest: ReportRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/generate`, reportRequest);
  }

  /**
   * Send email to admin
   */
  toadmin(emailRequest: EmailRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/email/toadmin`, emailRequest);
  }

  // ========== NEW PAYMENT EMAIL METHODS ==========

  /**
   * Send Payment Link to customer
   */
  sendPaymentLink(request: {
    email: string;
    customerName: string;
    carName: string;
    startDate: string | null;
    endDate: string | null;
    amount: number;
    bookingId: number;
    phone?: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment-email/send-payment-link`, request);
  }

  /**
   * Send Payment Confirmation with PDF
   */
  sendPaymentConfirmation(request: {
    email: string;
    customerName: string;
    carName: string;
    startDate: string;
    endDate: string;
    amount: string;
    transactionId: string;
    phone?: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment-email/send-confirmation`, request);
  }

  /**
   * Generate Payment Link only (without sending email)
   */
  generatePaymentLink(
    bookingId: number,
    customerName: string,
    customerEmail: string,
    carName: string,
    startDate: string,
    endDate: string,
    amount: number,
    phone?: string
  ): Observable<any> {
    const params = new URLSearchParams({
      bookingId: bookingId.toString(),
      customerName,
      customerEmail,
      carName,
      startDate,
      endDate,
      amount: amount.toString(),
      phone: phone || ''
    });
    return this.http.get(`${this.baseUrl}/payment-email/generate-link?${params.toString()}`);
  }
}
