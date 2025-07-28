import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoitureService } from '../../services/voiture.service';
import { Voiture } from '../../models/voiture.model';
import { Review } from '../../models/review.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-car-details-agence',
  templateUrl: './car-details-agence.component.html',
  styleUrl: './car-details-agence.component.css'
})
export class CarDetailsAgenceComponent {

  car: Voiture | null = null;
  reviews: Review[] = [];
  selectedFile: File | null = null;
  imageDialogVisible = false;
  isOpen = false;
  selectedOption: { label: string, value: boolean } | null = null;

    // Dropdown options
    availabilityOptions = [
      { label: 'Available', value: true },
      { label: 'Not Available', value: false }
    ];


    constructor(
      private route: ActivatedRoute,
      private voitureService: VoitureService,
      private messageService: MessageService
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const carId = Number(params.get('id'));
      if (carId) this.fetchCarDetails(carId);
    });
  }



  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  // Handle option selection
  selectOption(option: { label: string, value: boolean }) {
    this.selectedOption = option;
    this.isOpen = false; // Close dropdown after selection
  }

  // ✅ Fetch details of a specific car
  fetchCarDetails(carId: number) {
    this.voitureService.getVoitureById(carId).subscribe(
      (response: { success: boolean; data: Voiture }) => {
        console.log("Fetched car details:", response); // ✅ Debugging log
        if (response.success && response.data) {
          this.car = response.data;

          // ✅ Map reviews for the specific car
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

  onRowEditSave(car: Voiture) {
    if (!car.id) {
      console.error("Car ID is missing!");
      return;
    }

    this.voitureService.updateVoiture(car.id, car).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Updated ${car.carName}` });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update the car' });
      }
    });
  }

  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i + 1);
  }

  // ✅ Handle File Selection
  onFileSelected(event: any) {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      console.log("Selected file:", this.selectedFile?.name);
    } else {
      this.selectedFile = null;
    }
  }

  // ✅ Upload File
  uploadImage() {
    if (!this.car || !this.car.id) {
      console.error("Car ID is missing!");
      return;
    }

    if (!this.selectedFile) {
      console.error("No file selected!");
      return;
    }

    this.voitureService.updateVoiture(this.car.id, this.car, this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car image updated' });
        this.selectedFile = null; // ✅ Reset file after successful upload
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update car image' });
      }
    });
  }






  // ✅ View Images (Opens Modal)
viewImages() {
  this.imageDialogVisible = true;
}

// ✅ Delete All Images
deleteAllImages() {
  if (!this.car || !this.car.id) {
    console.error("Car ID is missing!");
    return;
  }

}
}
