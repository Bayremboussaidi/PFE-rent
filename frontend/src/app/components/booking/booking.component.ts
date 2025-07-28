import { FollowerService } from './../../services/follower.service';
import { Component, Input, OnInit, Output, EventEmitter, input } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import moment from 'moment';
import { UserloginService } from '../../services/user_login/userlogin.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingModalComponent implements OnInit {
  today: Date = new Date();
  @Input() showModal: boolean = false;
  @Input() voitureId!: string;
  @Input() carName!: string;
  @Input() agence!: string;
  @Input() carPrice!: number;
  @Output() close = new EventEmitter<void>();

  bookingData = {
    userId: 8,
    username: '',
    carName: '',
    agence:'myloc',
    userEmail: '',
    nbrJrs: 0,
    phone: '0',
    description: '',
    startDate: '',
    endDate: '',
    price: 0,
    voitureId: 0,
    pickupLocation: 'lac2,tunis',
    dropoffLocation: 'lac2,tunis',
  };

  responseMessage: string = '';
  unavailableDates: Date[] = [];

  constructor(    private bookingService: BookingService,
    private userLoginService: UserloginService , private followerService: FollowerService ,  private emailService: EmailService ) {}

  ngOnInit() {
    this.loadUserData();

    if (this.voitureId) {
      this.bookingData.voitureId = Number(this.voitureId); //  Convert once
      this.bookingData.carName = this.carName;
      this.bookingData.agence = this.agence;
      this.fetchUnavailableDates();
    }
  }


  public loadUserData() {
    const  currentUser = this.userLoginService.getCurrentUser();
    if (currentUser) {
      this.bookingData.userId = Number(currentUser.id);
      this.bookingData.username = currentUser.username || '';
      this.bookingData.userEmail = currentUser.email || '';

      // Handle phone number conversion and fallback
      this.bookingData.phone = currentUser.phone ? String(currentUser.phone) : '0';

      console.log('Loaded user data:', {
        userId: this.bookingData.userId,
        username: this.bookingData.username,
        email: this.bookingData.userEmail,
        phone: this.bookingData.phone
      });
    }
  }

  fetchUnavailableDates() {
    if (!this.voitureId) return;

    this.bookingService.getUnavailableDates(this.voitureId).subscribe({
      next: (data) => {
        if (data.unavailableDates) {
          this.unavailableDates = data.unavailableDates.flatMap((booking: any) => {
            const start = moment(booking.startDate);
            const end = moment(booking.endDate);
            let dates = [];
            while (start.isSameOrBefore(end, "day")) {
              dates.push(start.toDate());
              start.add(1, "days");
            }
            return dates;
          });
        }
      },
      error: (error: any) => console.error("Error fetching availability:", error)
    });
  }

  isDateDisabled = (date: Date): boolean => {
    return this.unavailableDates.some(d => moment(d).isSame(date, "day"));
  };



  onSubmit() {
    const currentUser = this.userLoginService.getCurrentUser();

    // Handle follower subscription first
    if (currentUser?.email) {
        this.followerService.addFollower(currentUser.email).subscribe({
            next: () => console.log('Added user to followers', currentUser.email),
            error: (err) => console.error('Follower error:', err)
        });
    } else {
        console.error('No user email available');
    }

    // Validate required fields
    if (!this.voitureId || !this.bookingData.startDate || !this.bookingData.endDate) {
        this.responseMessage = "Please fill in all required fields!";
        return;
    }

    // Prepare booking data
    this.bookingData = {
        ...this.bookingData,
        voitureId: Number(this.voitureId),
        carName: this.carName,
        agence: this.agence,
        startDate: moment(this.bookingData.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.bookingData.endDate).format("YYYY-MM-DD")
    };

    // Calculate pricing
    this.calculateDaysAndPrice();

    console.log("Sending Booking Data:", JSON.stringify(this.bookingData, null, 2));

    // Single booking submission
    this.bookingService.createBooking(this.bookingData).subscribe({
        next: (response: any) => {
            this.responseMessage = response.message || "Booking successful!";

            if (response.success) {
                // Send email to admin after successful booking
                const emailRequest = {
                    name: currentUser?.firstName && currentUser?.lastName
                        ? `${currentUser.firstName} ${currentUser.lastName}`
                        : 'Unknown User',
                    email: currentUser?.email || this.bookingData.userEmail || 'no-email@example.com',
                    message: `New booking request created for ${this.carName} (ID: ${this.voitureId})
                            from ${this.bookingData.startDate} to ${this.bookingData.endDate}`
                };

                this.emailService.toadmin(emailRequest).subscribe({
                    next: () => console.log('Admin notification email sent'),
                    error: (emailError) => console.error('Email failed:', emailError)
                });

                // Update UI
                this.fetchUnavailableDates();
                setTimeout(() => this.closeModal(), 2000);
            }
        },
        error: (error: any) => {
            console.error("Booking error:", error);
            this.responseMessage = error.error?.message || "Booking failed. Please try again.";
        }
    });
}






  closeModal() {
    this.showModal = false;
    this.close.emit();
  }





  //calculate numb of days and price
  calculateDaysAndPrice() {
    if (this.bookingData.startDate && this.bookingData.endDate) {
      const start = moment(this.bookingData.startDate, "YYYY-MM-DD");
      const end = moment(this.bookingData.endDate, "YYYY-MM-DD");

      if (start.isBefore(end)) {
        this.bookingData.nbrJrs = end.diff(start, "days"); //  Calculate days
        this.bookingData.price = this.bookingData.nbrJrs * (this.carPrice || 0) * 0.8 ; //  promotion 20/100
      } else {
        this.bookingData.nbrJrs = 0;
        this.bookingData.price = 0;
      }
    }
}
}
