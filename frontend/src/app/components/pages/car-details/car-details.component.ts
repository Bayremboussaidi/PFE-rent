import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoitureService } from '../../../services/voiture.service';
import { ReviewService } from '../../../services/review-service.service'; //  Import ReviewService
import { Review } from '../../../models/review.model'; //  Import Review Interface
import {UserloginService} from '../../../services/user_login/userlogin.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



interface LocalPhotoResponseDTO {
  id: number;
  name: string;
  type: string;
  base64Data: string;
  imageSrc: string;
}

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit, OnDestroy {



  showBookingModal = false;
  selectedCar: any = null;

  showSignInPrompt = false;

  voitures: any[] = []; // Displayed cars for the current page





  carId: number | null = null;
  car: any;
  detail:any;
  otherCars: any[] = [];
  currentCarIndex: number = 0;
  carouselInterval: any;
  carImages: string[] = [];
  currentImageIndex: number = 0;
  reviews: Review[] = [];

  review: { username: string; email: string; reviewText: string; rating: number } = {
    username: '',
    email: '',
    reviewText: '',
    rating: 0
  };

  constructor(
    private route: ActivatedRoute,
    private voitureService: VoitureService,
    private reviewService: ReviewService,
    private userLoginService: UserloginService,
    private cd: ChangeDetectorRef,
    private router: Router  // Add this line
) {}

  ngOnInit(): void {
    this.loadUserData();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.carId = +id;
        this.loadCarDetails(this.carId);
        this.loadOtherCars(this.carId);
        this.loadCarImage(this.carId);
        this.loadReviews(this.carId);
      }


    });
  }

  previousImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.carImages.length) % this.carImages.length;
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.carImages.length;
  }



    // Close booking modal
    closeBookingModal(): void {
      console.log('Closing modal');
      this.showBookingModal = false;
    }


  private loadUserData(): void {
    const currentUser = this.userLoginService.getCurrentUser();
    if (currentUser) {

      console.log(currentUser);

      this.review.username = [currentUser.firstName, currentUser.lastName]
        .filter(name => name)
        .join(' ');

      this.review.email = currentUser.email || '';

    }
  }



  navigateToLogin(): void {
    this.router.navigate(['/login']);
    this.closeSignInPrompt();
  }

  // Close sign-in prompt
  closeSignInPrompt(): void {
    this.showSignInPrompt = false;
  }



  loadCarDetails(id: number): void {
    this.voitureService.getVoitureById(id).subscribe(
      (response: any) => {
        if (response && response.success) {
          this.car = response.data;
          this.detail = this.car.voiture;
          this.reviews = this.car.reviews || [];
        } else {
          console.error('Error: Unexpected API response format.');
        }
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }


  loadCarImage(id: number): void {
    this.voitureService.getCarImageById(id).subscribe(
      (photos: any) => { // Use any type to bypass conflict
        const typedPhotos = photos as LocalPhotoResponseDTO[];
        if (typedPhotos?.length > 0) {
          this.carImages = typedPhotos.map(photo =>
            `data:${photo.type};base64,${photo.base64Data}`
          );
        } else {
          this.carImages = ['/assets/default-car.jpg'];
        }
      },
      (error: any) => {
        console.error('Error fetching car images:', error);
        this.carImages = ['/assets/default-car.jpg'];
      }
    );
  }

    loadOtherCars(currentCarId: number): void {
      this.voitureService.getVoitures().subscribe(
        (response: any) => {
          if (response?.data) {
            const otherCars = response.data.filter((car: any) => car.id !== currentCarId);

            const carRequests = otherCars.map((car: any) =>
              this.voitureService.getCarImageById(car.id).pipe(
                map((photos: any) => ({
                  ...car,
                  imgUrl: photos?.length > 0
                    ? `data:${photos[0].type};base64,${photos[0].base64Data}`
                    : '/assets/default-car.jpg'
                })),
                catchError(() => of({
                  ...car,
                  imgUrl: '/assets/default-car.jpg'
                }))
              )
            );

            // Add type parameter to forkJoin
            forkJoin<any[]>(carRequests).subscribe((cars) => {
              this.otherCars = cars;
              this.startCarousel();
            });
          }
        },
        (error) => console.error('Error fetching other cars:', error)
      );
    }




  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.currentCarIndex = (this.currentCarIndex + 1) % this.otherCars.length;
    }, 9000);
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  submitReview() {

    if (!this.isLoggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'You must be logged in to submit a review.'
      });
      return;
    }



    if (!this.carId) {
      console.error('Error: No car ID found');
      return;
    }

    // Check if rating is missing or zero
    if (!this.review.rating || this.review.rating < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Rating Required',
        text: 'Please provide a rating before submitting your review.'
      });
      return;
    }

    const reviewPayload = {
      username: this.review.username,
      email: this.review.email,
      reviewText: this.review.reviewText,
      rating: this.review.rating
    };

    this.reviewService.createReview(this.carId, reviewPayload)
      .subscribe(
        (newReview: Review) => {
          console.log('Review submitted successfully:', newReview);
          this.car.reviews.unshift(newReview);
          this.review = { username: '', email: '', reviewText: '', rating: 0 };

          // Success alert
          Swal.fire({
            icon: 'success',
            title: 'Thank you!',
            text: 'Your review has been submitted successfully.'
          });
        },
        (error) => {
          console.error('Error submitting review:', error);

          // Error alert
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'There was an error submitting your review. Please try again later.'
          });
        }
      );
  }

  loadReviews(id: number): void {
    this.voitureService.getReviewsForVoiture(id).subscribe(
      (response: any) => {
        if (response && response.success) {
          this.car.reviews = response.data.reviews || [];
        } else {
          console.error('Error: Unexpected API response format.');
        }
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }




  //purchase

  openBookingModal(voiture: any): void {
    console.log('Is user logged in?', this.isLoggedIn);

    if (this.isLoggedIn) {
      console.log('Booking car:', voiture);
      this.selectedCar = voiture.voiture ; // Store car details
      this.showBookingModal = true; // Show modal
    } else {
      this.showSignInPrompt = true;
      this.cd.detectChanges(); // Detect changes for modal visibility
    }
  }



  get isLoggedIn(): boolean {
    return this.userLoginService.isLoggedIn();
  }

}
