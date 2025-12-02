import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  @Input() amount: number = 0;
  @Input() bookingId: number = 0;
  @Input() carName: string = '';
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() customerEmail: string = '';
  @Input() customerName: string = '';
  @Input() phone: string = '';
  @Output() paymentSuccess = new EventEmitter<any>();
  @Output() paymentError = new EventEmitter<string>();

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;

  loading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  clientSecret: string = '';
  paymentIntentId: string = '';
  stripeReady: boolean = false;

  paymentData = {
    amount: 0,
    currency: 'usd',
    customerEmail: '',
    customerName: '',
    carName: '',
    startDate: '',
    endDate: '',
    phone: '',
    bookingId: 0
  };

  private apiUrl = environment.stripePaymentUrl + '/api/payment';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.paymentData = {
      amount: this.amount || 150,
      currency: 'usd',
      customerEmail: this.customerEmail,
      customerName: this.customerName,
      carName: this.carName || 'BMW X5',
      startDate: this.startDate || '2025-01-10',
      endDate: this.endDate || '2025-01-15',
      phone: this.phone,
      bookingId: this.bookingId || 1
    };
  }

  async ngAfterViewInit() {
    // Wait for DOM to be ready
    setTimeout(async () => {
      await this.initializeStripe();
    }, 100);
  }

  async initializeStripe() {
    try {
      this.stripe = await loadStripe(environment.stripePublicKey);

      if (this.stripe) {
        this.elements = this.stripe.elements();

        const cardElementContainer = document.getElementById('card-element');
        if (!cardElementContainer) {
          console.warn('Card element container not found, retrying...');
          setTimeout(() => this.initializeStripe(), 200);
          return;
        }

        this.cardElement = this.elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' }
            },
            invalid: {
              color: '#9e2146'
            }
          }
        });
        this.cardElement.mount('#card-element');
        this.stripeReady = true;

        this.cardElement.on('change', (event) => {
          this.errorMessage = event.error ? event.error.message : '';
        });

        console.log('Stripe initialized successfully');
      }
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      // Retry after delay instead of showing error
      setTimeout(() => this.initializeStripe(), 500);
    }
  }

  async createPaymentIntent() {
    try {
      const response: any = await this.http.post(`${this.apiUrl}/create-payment-intent`, {
        amount: this.paymentData.amount,
        currency: this.paymentData.currency,
        customerEmail: this.paymentData.customerEmail,
        customerName: this.paymentData.customerName,
        bookingId: this.paymentData.bookingId,
        carName: this.paymentData.carName,
        startDate: this.paymentData.startDate,
        endDate: this.paymentData.endDate,
        phone: this.paymentData.phone
      }).toPromise();

      if (response.status === 'error') {
        this.errorMessage = response.message;
        return null;
      }

      this.clientSecret = response.clientSecret;
      this.paymentIntentId = response.paymentIntentId;
      return response;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      this.errorMessage = 'Failed to create payment. Please check if the payment service is running.';
      return null;
    }
  }

  async processPayment() {
    await this.submitPayment();
  }

  async submitPayment() {
    if (!this.stripe || !this.cardElement) {
      this.errorMessage = 'Please wait, payment system is loading...';
      setTimeout(() => this.submitPayment(), 500);
      return;
    }

    if (!this.paymentData.customerEmail || !this.paymentData.customerName) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.loading = true;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const intentResponse = await this.createPaymentIntent();

      if (!intentResponse || !this.clientSecret) {
        this.loading = false;
        this.isLoading = false;
        return;
      }

      const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.cardElement,
          billing_details: {
            name: this.paymentData.customerName,
            email: this.paymentData.customerEmail
          }
        }
      });

      if (error) {
        this.errorMessage = error.message || 'Payment failed';
        this.paymentError.emit(this.errorMessage);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        await this.http.post(`${this.apiUrl}/confirm/${this.paymentIntentId}`, {}).toPromise();
        this.successMessage = 'Payment successful! Confirmation email sent.';
        this.paymentSuccess.emit(paymentIntent);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Payment failed';
      this.paymentError.emit(this.errorMessage);
    } finally {
      this.loading = false;
      this.isLoading = false;
    }
  }
}
