import { QRCodeService } from './../../services/qrcode.service';
import { Component, OnInit } from '@angular/core';
import { BookingService } from './../../services/booking.service';
import { EmailService } from '../../services/email.service';
import { EmailRequest } from '../../models/emailRequest.model';
import { ReportRequest } from '../../models/ReportRequest.model';
import { NotifService } from '../../services/notif.service';
import { Notification } from '../../models/Notification.model';
import { VoitureService } from '../../services/voiture.service';
import { Router } from '@angular/router';
import { ApiResponseAgence, Voiture } from '../../models/ApiResponseAgence';
import { ActivatedRoute } from '@angular/router';

interface BookingData {
  id: number;
  userId: number;
  username: string;
  carName: string;
  userEmail: string;
  nbrJrs: number;
  phone: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  bookingStatus: string;
  pickupLocation: string;
  agence: string;
  dropoffLocation: string;
  formattedDate?: string;
  price: number;
}

@Component({
  selector: 'app-bookings',
  templateUrl: './booking-a.component.html',
  styleUrls: ['./booking-a.component.css']
})
export class BookingAComponent implements OnInit {
  bookings: BookingData[] = [];
  agencyName = "";
  filteredBookings: BookingData[] = [];
  activeButton: string = 'pending';

  constructor(
    private bookingService: BookingService,
    private emailService: EmailService,
    private notificationService: NotifService,
    private qrCodeService: QRCodeService,
    private voitureService: VoitureService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['agencyName']) {
        this.agencyName = params['agencyName'];
        console.log('Agency Name from query params:', this.agencyName);
      } else {
        const agencyData = localStorage.getItem('agency_data');
        if (agencyData) {
          const parsedData = JSON.parse(agencyData);
          this.agencyName = parsedData.agencyName;
          console.log('Agency Name from localStorage (booking):', this.agencyName);
        } else {
          console.error('No agencyName found in query params or localStorage');
        }
      }
    });

    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.bookings = response.data.map((booking: any) => ({
            id: booking.id,
            userId: booking.userId,
            username: booking.username,
            carName: booking.carName,
            userEmail: booking.userEmail,
            nbrJrs: booking.nbrJrs,
            phone: booking.phone,
            description: booking.description,
            startDate: booking.startDate,
            endDate: booking.endDate,
            agence: booking.agence,
            price: booking.price || 0,
            bookingStatus: booking.bookingStatus,
            pickupLocation: booking.pickupLocation,
            dropoffLocation: booking.dropoffLocation,
            formattedDate: this.formatDate(booking.startDate, booking.endDate)
          }));

          // Debug: Log all bookings
          console.log('All bookings:', this.bookings);
          console.log('Agency Name:', this.agencyName);

          // Apply filter based on active button
          if (this.activeButton === 'pending') {
            this.showPending();
          } else {
            this.showTraited();
          }
        }
      },
      (error: any) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  formatDate(startDate: string | null, endDate: string | null): string {
    if (!startDate || !endDate) {
      return 'N/A';
    }
    return `${startDate} - ${endDate}`;
  }

  showPending(): void {
    this.activeButton = 'pending';
    this.filteredBookings = this.bookings.filter(booking => {
      const isPending = booking.bookingStatus === 'PENDING';
      const isAgencyMatch = booking.agence === this.agencyName;

      console.log(`Booking ${booking.id}: status=${booking.bookingStatus}, agency=${booking.agence}, isPending=${isPending}, isAgencyMatch=${isAgencyMatch}`);

      return isPending && isAgencyMatch;
    });

    console.log('Filtered Pending Bookings:', this.filteredBookings);
  }

  showTraited(): void {
    this.activeButton = 'traited';
    this.filteredBookings = this.bookings.filter(booking => {
      const isProcessed = booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'CANCELED';
      const isAgencyMatch = booking.agence === this.agencyName;

      return isProcessed && isAgencyMatch;
    });

    console.log('Filtered Processed Bookings:', this.filteredBookings);
  }

  /**
   * Accept booking and send PAYMENT LINK to customer
   */
  accept(booking: BookingData): void {
    this.bookingService.updateBookingStatus(booking.id, 'CONFIRMED').subscribe(
      () => {
        console.log(`Booking ${booking.id} accepted.`);

        // ========== SEND PAYMENT LINK EMAIL ==========
        const paymentLinkRequest = {
          email: booking.userEmail,
          customerName: booking.username,
          carName: booking.carName,
          startDate: booking.startDate,
          endDate: booking.endDate,
          amount: booking.price,
          bookingId: booking.id,
          phone: booking.phone || ''
        };

        this.emailService.sendPaymentLink(paymentLinkRequest).subscribe(
          (response: any) => {
            console.log('Payment link sent successfully:', response);
            console.log('Payment Link:', response.paymentLink);
          },
          (error: any) => {
            console.error('Error sending payment link:', error);
            this.sendFallbackConfirmationEmail(booking);
          }
        );

        // Send notification
        const notificationRequest: Notification = {
          recipient: booking.userEmail,
          message: `Your reservation for ${booking.carName} has been confirmed. Please complete the payment.`,
          seen: false,
          createdAt: new Date()
        };

        this.notificationService.createNotification(notificationRequest).subscribe(
          response => {
            console.log('Notification stored successfully', response);
          },
          (error: any) => {
            console.error('Error storing notification', error);
          }
        );

        // Reload bookings to refresh the list
        this.loadBookings();
      },
      (error: any) => {
        console.error('Error accepting booking:', error);
      }
    );
  }

  /**
   * Fallback: Send old confirmation email if payment link fails
   */
  private sendFallbackConfirmationEmail(booking: BookingData): void {
    const qrCodeData = `Car: ${booking.carName}\nStart Date: ${booking.startDate}\nEnd Date: ${booking.endDate}\nPrice: ${booking.price}`;

    const reportRequest: ReportRequest = {
      name: booking.username,
      email: booking.userEmail,
      message: `Your reservation for ${booking.carName} has been confirmed.`,
      qrCode: qrCodeData
    };

    this.emailService.sendReportEmail(reportRequest).subscribe(
      response => {
        console.log('Fallback email sent successfully', response);
      },
      error => {
        console.error('Error sending fallback email', error);
      }
    );
  }

  /**
   * Refuse booking
   */
  refuse(booking: BookingData): void {
    this.bookingService.updateBookingStatus(booking.id, 'CANCELED').subscribe(
      () => {
        console.log(`Booking ${booking.id} declined.`);

        const emailRequest: EmailRequest = {
          name: booking.username,
          email: booking.userEmail,
          message: `Your reservation for ${booking.carName} has been declined.`
        };

        this.emailService.informEmail(emailRequest).subscribe(
          (response) => {
            console.log('Email sent successfully', response);
          },
          (error) => {
            console.error('Error sending email', error);
          }
        );

        const notificationRequest: Notification = {
          recipient: booking.userEmail,
          message: `Your reservation for ${booking.carName} has been declined.`,
          seen: false,
          createdAt: new Date()
        };

        this.notificationService.createNotification(notificationRequest).subscribe(
          (response) => {
            console.log('Notification stored successfully', response);
          },
          (error: any) => {
            console.error('Error storing notification', error);
          }
        );

        // Reload bookings to refresh the list
        this.loadBookings();
      },
      (error: any) => {
        console.error('Error declining booking:', error);
      }
    );
  }
}
