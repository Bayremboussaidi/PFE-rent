import { BookingService } from './../../services/booking.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Booking } from '../../models/booking.model';
import {ReviewService } from '../../services/review-service.service';
import { Review } from '../../models/review.model';
import { ImageService } from '../../services/image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-a-details',
  templateUrl: './user-a-details.component.html',
  styleUrls: ['./user-a-details.component.css']
})
export class UserADetailsComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string = '';
  user: User | null = null;
  bookings: Booking[] = [];
  userHistory: any[] = [];
  showBookingActions: boolean = false; // Set to true if you want to show actions
  userReviews: Review[] = [];
  defaultAvatar = 'assets/images/default-avatar.png';



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private BookingService : BookingService,
    private ReviewService  : ReviewService ,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUserDetails();

  }

  get safePhotoUrl(): SafeUrl | string {
    try {
      if (this.user?.photo) {
        if (this.user.photo.startsWith('data:')) {
          return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.photo);
        }
        return this.sanitizer.bypassSecurityTrustUrl(this.user.photo);
      }
    } catch (error) {
      console.error('Error sanitizing URL:', error);
    }
    return this.defaultAvatar;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.defaultAvatar) {
      console.warn('Image load error, using default avatar');
      img.src = this.defaultAvatar;
      img.onerror = null; // Break error loop
    }
  }

  loadUserDetails(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId || isNaN(+userId)) {
      this.errorMessage = 'Invalid user ID';
      this.isLoading = false;
      return;
    }

    this.userService.getUserById(+userId).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.user = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            role: response.data.role,
            phone: response.data.phone,
            workplace: response.data.workplace,

            photo: response.data.photo || this.defaultAvatar,

            createdAt: response.data.createdAt ? new Date(response.data.createdAt) : new Date(),
            updatedAt: response.data.updatedAt ? new Date(response.data.updatedAt) : new Date(),
            isActive: response.data.isActive,
            comments: response.data.comments || []
          };
          this.loadBookings();
          this.loadReviews();
        } else {
          this.errorMessage = response.message || 'User not found';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load user details';
        console.error('Error loading user:', err);
        this.isLoading = false;
      }
    });
  }


    loadBookings(): void {
      if (this.user?.username) {
        this.BookingService.getUserBookings(this.user.username).subscribe({
          next: (response: any) => {
            if (response.success) {
              this.bookings = response.data.map((booking: any) => ({
                id: booking.id,
                carName: booking.carName,
                startDate: new Date(booking.startDate),
                endDate: new Date(booking.endDate),
                price: booking.price ,
                nbrJrs: booking.nbrJrs,
                bookingStatus: booking.bookingStatus,
                // Add other necessary properties
              }));
            }
          },
          error: (err) => {
            console.error('Error loading bookings:', err);
          }
        });
      }
    }

  viewBookingDetails(bookingId: number): void {
    this.router.navigate(['/bookings', bookingId]);
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  editUser(): void {
    if (this.user?.id) {
      this.router.navigate(['edit', this.user.id], { relativeTo: this.route });
    }
  }

  deleteUser(): void {
    if (this.user?.id && confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete user';
          console.error('Error deleting user:', err);
        }
      });
    }
  }



  loadReviews(): void {
    if (this.user?.username) {
      this.ReviewService.getReviewsByUsername(this.user.username).subscribe({
        next: (reviews) => {
          this.userReviews = reviews;
        },
        error: (err) => {
          console.error('Error loading reviews:', err);
        }
      });
    }
  }
}

