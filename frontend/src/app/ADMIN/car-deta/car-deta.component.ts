import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoitureService } from '../../services/voiture.service';
import { Voiture } from '../../models/voiture.model';
import { Review } from '../../models/review.model';
import { MessageService } from 'primeng/api';
import { ReviewService } from '../../services/review-service.service';
import { PhotoService } from '../../services/photo.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-car-deta',
  templateUrl: './car-deta.component.html',
  styleUrls: ['./car-deta.component.css'],
  providers: [MessageService]
})
export class CarDetaComponent implements OnInit {
  car: Voiture | null = null;
  sanitizedPhotos: SafeUrl[] = [];

  book: any[] = [];
  reviews: Review[] = [];
  selectedFiles: File[] = [];
  imageDialogVisible = false;
  isOpen = false;
  selectedOption: { label: string, value: boolean } | null = null;

  previewUrls: string[] = [];


  availabilityOptions = [
    { label: 'Available', value: true },
    { label: 'Not Available', value: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private voitureService: VoitureService,
    private messageService: MessageService,
    private photoService: PhotoService,
    private reviewService: ReviewService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const carId = Number(params.get('id'));
      if (carId) this.fetchCarDetails(carId);
    });
  }

  fetchCarDetails(carId: number): void {
    this.voitureService.getVoitureById(carId).subscribe({
      next: (response: any) => {
        if (response?.success && response.data) {
          this.car = {
            ...response.data.voiture,
            photos: (response.data.photos || []).map((photo: any) => ({
              ...photo,
              displayUrl: this.sanitizer.bypassSecurityTrustUrl(
                `data:${photo.type};base64,${photo.base64Data}`
              )            }))
          };
          this.book = response.data.bookings || [];
          this.reviews = (response.data.reviews || []).map((review: any) => ({
            id: review.id ?? 0,
            username: review.username || 'Anonymous',
            reviewText: review.reviewText || '',
            rating: review.rating ?? 0,
            createdAt: review.createdAt ? new Date(review.createdAt) : new Date(),
            updatedAt: review.updatedAt ? new Date(review.updatedAt) : new Date(),
            carName: response.data.voiture.carName || 'Unknown Car'
          }));
        }
      },
      error: (error) => {
        console.error('Error fetching car details:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load car details'
        });
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.files ? Array.from(event.files) : [];

    // Preview selected images
    this.previewUrls = [];
    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewUrls.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }


  uploadImage(): void {
    if (!this.car?.id || this.selectedFiles.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please select at least one image'
      });
      return;
    }

    const carId = this.car.id;
    this.photoService.uploadPhotos(carId, null, this.selectedFiles).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Images uploaded successfully'
        });
        this.selectedFiles = [];
        this.fetchCarDetails(carId);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to upload images: ' + error.message
        });
      }
    });
  }

  deleteAllImages(): void {
    if (!this.car?.id) return;

    const carId = this.car.id;
    this.photoService.deletePhotosByVoitureId(carId).subscribe({
      next: () => {
        if (this.car) {
          this.car.photos = [];
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'All images deleted successfully'
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete images: ' + error.message
        });
      }
    });
  }

  viewImages(): void {
    this.imageDialogVisible = true;
  }

  onRowEditSave(car: Voiture): void {
    if (!car.id) {
      console.error("Car ID is missing!");
      return;
    }

    this.voitureService.updateVoiture(car.id, car).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Updated ${car.carName}`
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not update the car'
        });
      }
    });
  }

  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i + 1);
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Review deleted'
          });
          if (this.car?.id) {
            this.fetchCarDetails(this.car.id);
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete review'
          });
          console.error('Error deleting review:', error);
        }
      });
    }
  }

  goBack(): void {
    window.history.back();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: { label: string, value: boolean }): void {
    this.selectedOption = option;
    this.isOpen = false;
  }


}
