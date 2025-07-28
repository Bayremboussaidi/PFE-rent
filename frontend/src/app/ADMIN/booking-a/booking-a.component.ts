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
import { ApiResponseAgence , Voiture} from '../../models/ApiResponseAgence';
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
  bookingStatus: string; //  Make sure bookingStatus is included
  pickupLocation: string;
  agence: string;
  dropoffLocation: string;
  formattedDate?: string; // Optional for UI display
  price: number;
}


@Component({
  selector: 'app-bookings',
  templateUrl: './booking-a.component.html',
  styleUrls: ['./booking-a.component.css']
})
export class BookingAComponent implements OnInit {
  bookings: BookingData[] = []; //
  //  Use the new local BookingData model

  agencyName = "";

  filteredBookings: BookingData[] = [];
  activeButton: string = 'pending'; // Default to 'En Cours' (Pending)

  constructor(private bookingService: BookingService , private emailService: EmailService , private notificationService : NotifService ,
private qrCodeService : QRCodeService ,    private voitureService: VoitureService,     private router: Router,private route: ActivatedRoute
) {}



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['agencyName']) {
        this.agencyName = params['agencyName'];
        console.log('Agency Name from query params:', this.agencyName);
      } else {
        // If no agencyName in query params, get it from localStorage
        const agencyData = localStorage.getItem('agency_data');
        if (agencyData) {
          const parsedData = JSON.parse(agencyData);
          this.agencyName = parsedData.agencyName;  // Fallback to localStorage
          console.log('Agency Name from localStorage (booking):', this.agencyName);
        } else {
          console.error('No agencyName found in query params or localStorage');
        }
      }
    });

    this.loadBookings();
  }

  /**
   * Load all bookings from the backend
   */
  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.bookings = response.data.map((booking: any) => ({
            // Explicitly map critical fields (avoids TypeScript type issues)
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
            // Optional UI property
            formattedDate: this.formatDate(booking.startDate, booking.endDate)
          }));
          this.showPending();
        }
      },
      (error: any) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  /**
   * Format the booking period
   */
  formatDate(startDate: string | null, endDate: string | null): string {
    if (!startDate || !endDate) {
      return 'N/A';
    }
    return `${startDate} - ${endDate}`;
  }

  /**
   * Show only pending bookings (En cours)
   */
  showPending(): void {
    this.filteredBookings = this.bookings.filter(booking =>
      booking.bookingStatus === 'PENDING' && booking.agence === this.agencyName
    );
    this.activeButton = 'pending';
  }
  /**
   * Show confirmed or canceled bookings (Traité)
   */
  showTraited(): void {
    this.filteredBookings = this.bookings.filter(booking =>
      (booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'CANCELED') &&
      booking.agence === this.agencyName
    );
    this.activeButton = 'traited';
  }


  accept(booking: BookingData): void {
    this.bookingService.updateBookingStatus(booking.id, 'CONFIRMED').subscribe(
      () => {
        console.log(`Réservation ${booking.id} acceptée.`);
        booking.bookingStatus = 'CONFIRMED'; // Update UI directly
        this.loadBookings(); // Force UI refresh

        // Generate QR code data
        const qrCodeData = `Car: ${booking.carName}\nStart Date: ${booking.startDate}\nEnd Date: ${booking.endDate}\nPrice: ${booking.price}`;


        // Create report request
        const reportRequest: ReportRequest = {
          name: booking.username,
          email: booking.userEmail,
          message: `Votre réservation pour ${booking.carName} a été confirmée.`,
          qrCode: qrCodeData // Attach QR code data
        };

        // Send confirmation email with QR code and PDF attachment
        this.emailService.sendReportEmail(reportRequest).subscribe(
          response => {
            console.log('Email sent successfully', response);
          },
          error => {
            console.error('Error sending email', error);
          }
        );

        // Send notification request
        const notificationRequest: Notification = {
          recipient: booking.userEmail,
          message: `Votre réservation pour ${booking.carName} a été confirmée.`,
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
      },
      (error: any) => {
        console.error('Erreur lors de l\'acceptation de la réservation:', error);
      }
    );
  }



refuse(booking: BookingData): void {
  this.bookingService.updateBookingStatus(booking.id, 'CANCELED').subscribe(
    () => {
      console.log(`Réservation ${booking.id} refusée.`);
      booking.bookingStatus = 'CANCELED'; // Update UI directly
      this.loadBookings(); // Force UI refresh

      // Send refusal email
      const emailRequest: EmailRequest = {
        name: booking.username,
        email: booking.userEmail,
        message: `Votre réservation pour ${booking.carName} a été réfusée.`
      };

      this.emailService.informEmail(emailRequest).subscribe(
        (response) => {
          console.log('Email sent successfully', response);
        },
        (error) => {
          console.error('Error sending email', error);
        }
      );

      // Send notification request
      const notificationRequest: Notification = {
        recipient: booking.userEmail,
        message: `Votre réservation pour ${booking.carName} a été réfusée.`,
        seen: false,
        createdAt: new Date() // Provide default value for createdAt

      };



      this.notificationService.createNotification(notificationRequest).subscribe(
        (response) => {
          console.log('Notification stored successfully', response);
        },
        (error: any) => {
          console.error('Error storing notification', error);
        }
      );
    },
    (error: any) => {
      console.error('Erreur lors du refus de la réservation:', error);
    }
  );
}}




















/*accept(booking: BookingData): void {
  this.bookingService.updateBookingStatus(booking.id, 'CONFIRMED').subscribe(
      () => {
          console.log(`Réservation ${booking.id} acceptée.`);
          booking.bookingStatus = 'CONFIRMED'; // Update UI directly
          this.loadBookings(); // Force UI refresh

          // Generate QR code
          const qrCodeData = `Booking ID: ${booking.id}\nCar: ${booking.carName}\nStart Date: ${booking.startDate}\nEnd Date: ${booking.endDate}`;
          const qrCode = this.qrCodeService.generateQRCode(qrCodeData);

          // Generate Jasper Report
          const jasperReport = this.jasperReportService.generateReport(booking, qrCode);

          // Send confirmation email with QR code and Jasper Report
          const reportRequest: ReportRequest = {
              name: booking.username,
              email: booking.userEmail,
              message: `Votre réservation pour ${booking.carName} a été confirmée.`,
              qrCode: qrCode, // Attach QR code
              attachment: jasperReport // Attach Jasper Report
          };

          this.emailService.informEmail(reportRequest).subscribe(
              response => {
                  console.log('Email sent successfully', response);
              },
              error => {
                  console.error('Error sending email', error);
              }
          );

          // Send notification request
          const notificationRequest: AppNotification = {
              recipient: booking.userEmail,
              message: `Votre réservation pour ${booking.carName} a été confirmée.`,
              seen: false,
          };

          this.notificationService.createNotification(notificationRequest).subscribe(
              response => {
                  console.log('Notification stored successfully', response);
              },
              (error: any) => {
                  console.error('Error storing notification', error);
              }
          );
      },
      (error: any) => {
          console.error('Erreur lors de l\'acceptation de la réservation:', error);
      }
  );
}*/

