import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoitureService } from '../../services/voiture.service';
import { Voiture } from '../../models/voiture.model';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-cardetails-a',
  templateUrl: './cardetails-a.component.html',
  styleUrls: ['./cardetails-a.component.css']
})
export class CardetailsAComponent implements OnInit {
  car: Voiture | null = null;
  carImage: string = '/assets/images/default-car.png';
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private voitureService: VoitureService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const carId = Number(params.get('id'));
      if (carId) {
        this.fetchCarDetails(carId);
      }
    });
  }

  fetchCarDetails(carId: number) {
    this.voitureService.getVoitureById(carId).subscribe(
      (response: { success: boolean; data: Voiture }) => {
        if (response.success && response.data) {
          this.car = response.data;
          this.carImage = this.car.photos && this.car.photos.length > 0
            ? this.car.photos[0].displayUrl || '/assets/images/default-car.png'
            : '/assets/images/default-car.png';

          // Ensure reviews are properly mapped
          this.reviews = (this.car.reviews || []).map((review: any) => ({
            id: review.id ?? 0,
            username: review.username || 'Anonymous',
            reviewText: review.reviewText || '',
            rating: review.rating ?? 0,
            createdAt: review.createdAt ? new Date(review.createdAt).toISOString() : new Date().toISOString(),
            updatedAt: review.updatedAt ? new Date(review.updatedAt).toISOString() : new Date().toISOString(),
            carName: this.car?.carName || 'Unknown Car'
          }));
        }
      },
      (error) => console.error('Error fetching car details:', error)
    );
  }

  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i + 1);
  }
}
