/*import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../../../services/booking.service';
import { VoitureService } from '../../../services/voiture.service';
import { PhotoResponseDTO } from '../../../models/PhotoResponseDTO.model';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {
  isLoading: boolean = true;
  bookings: any[] = [];

  constructor(
    private bookingService: BookingService,
    private voitureService: VoitureService,
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
  ) {}

  ngOnInit() {
    if (this.data.email) {
      this.fetchBookings(this.data.email);
    } else {
      this.dialogRef.close();
    }
  }

  private fetchBookings(email: string) {
    this.bookingService.getBookingsByUserEmail(email).subscribe({
      next: (response: { success: boolean; data: any[] }) => {
        this.bookings = response.success ? response.data : [];
        this.loadCarImages();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
        this.isLoading = false;
        this.bookings = [];
      }
    });
  }

  private loadCarImages() {
    this.bookings.forEach(booking => {
      this.voitureService.getCarImageById(booking.voitureId).subscribe({
        next: (photos: PhotoResponseDTO[]) => {
          booking.imgUrl = photos && photos.length > 0
            ? `data:${photos[0].type};base64,${photos[0].data}`
            : '/assets/default-car.jpg';
        },
        error: () => {
          booking.imgUrl = '/assets/default-car.jpg';
        }
      });
    });
  }

  deleteBooking(bookingId: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(b => b.id !== bookingId);
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
*/
