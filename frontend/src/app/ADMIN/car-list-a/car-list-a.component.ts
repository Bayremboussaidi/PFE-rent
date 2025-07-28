import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoitureService } from '../../services/voiture.service';
import { Voiture } from '../../models/voiture.model';

@Component({
  selector: 'app-car-list-a',
  templateUrl: './car-list-a.component.html',
  styleUrls: ['./car-list-a.component.css']
})
export class CarListAComponent implements OnInit {
  cars: Voiture[] = [];
  displayedCars: Voiture[] = [];
  pageSize = 6;
  totalPages = 0;
  currentPage = 1;

  newCar: Voiture = {} as Voiture;
  isAddModalOpen: boolean = false;

  constructor(private voitureService: VoitureService, private router: Router) {}

  ngOnInit() {
    this.fetchAllCars();
  }

  fetchAllCars() {
    this.voitureService.getAllVoituresWithDetails().subscribe(
      (response: { success: boolean; data: Voiture[] }) => {
        if (response.success && response.data) {
          this.cars = response.data.map(car => ({
            ...car,
            // Map backend 'images' array to frontend model
            images: car.images || [],
            // Keep single image fallback if needed elsewhere
            image: car.images?.length > 0
              ? `data:${car.images[0].type};base64,${car.images[0].base64Data}`
              : '/assets/images/default-car.png',
            rating: this.calculateAverageRating(car.reviews)
          }));

          this.totalPages = Math.max(1, Math.ceil(this.cars.length / this.pageSize));
          this.updateDisplayedCars();
        }
      },
      (error:any) => console.error('Error fetching all cars:', error)
    );
  }

  updateDisplayedCars() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedCars = this.cars.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedCars();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCars();
    }
  }


  //delete the car
  deleteCar(car: any) {
    if (confirm(`Are you sure you want to delete the car with ID ${car.id}?`)) {
      this.voitureService.deleteVoiture(car.id).subscribe({
        next: (response) => {
          console.log('Car deleted successfully', response);
          this.fetchAllCars();
        },
        error: (err) => {
          console.error('Error deleting car', err);
        }
      });
    }
  }



  viewCarDetails(carId: number | undefined | null) {
    if (typeof carId === 'number' && !isNaN(carId)) {
      this.router.navigate([`admin/carlista/${carId}`]);
    } else {
      console.error("Car ID is invalid, cannot navigate.");
    }
  }


  calculateAverageRating(reviews: { rating: number }[]): number {
    if (!reviews || reviews.length === 0) {
      return 0; // Return 0 if there are no reviews
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length); // Calculate average rating
  }


  openAddModal(): void {
    console.log('Opening modal'); // Check if this logs
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }



  onAddCar(): void {
   /* if (!this.validateCarForm()) {
      return;
    }*/

    this.voitureService.addVoiture(this.newCar).subscribe({
      next: (response) => {
        /*this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Car added successfully'
        });*/
        this.closeAddModal();
        this.fetchAllCars(); // Refresh the list
      },
      error: (err) => {
        /*this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add car: ' + err.message
        });*/
      }
    });
  }

}
