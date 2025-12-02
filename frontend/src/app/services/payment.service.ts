import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null>;
  private apiUrl = environment.stripePaymentUrl;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  createPaymentIntent(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/create-payment-intent`, paymentData);
  }

  confirmPayment(paymentIntentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/confirm/${paymentIntentId}`, {});
  }

  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}
