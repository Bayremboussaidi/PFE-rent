import { Component, OnInit } from '@angular/core';
import { Voiture } from '../../../models/voiture.model';
import { VoitureService } from '../../../services/voiture.service'; // Adjust path as needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allVoitures: Voiture[] = []; // All cars from API
  filteredVoitures: Voiture[] = []; // Filtered cars to display
  loading: boolean = false;
  error: string | null = null;

  constructor(private voitureService: VoitureService) {}

  ngOnInit(): void {
  this.fetchAllVoitures();
  }

  // Fetch all cars from the backend
  fetchAllVoitures(): void {
    this.loading = true;
    this.voitureService.getVoitures().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response && response.data) {
          this.allVoitures = response.data;
          this.filteredVoitures = [...this.allVoitures]; // Initialize with all cars

          this.allVoitures.forEach((voiture: any) => {
            this.voitureService.getCarImageById(voiture.id).subscribe(
              (photos: any[]) => {
                if (photos?.length > 0) {
                  voiture.imgUrl = `data:${photos[0].type};base64,${photos[0].base64Data}`;
                } else {
                  voiture.imgUrl = '/assets/default-car.jpg';
                }
              },
              (error: any) => {
                console.error(`Error fetching images for voiture ${voiture.id}:`, error);
                voiture.imgUrl = '/assets/default-car.jpg';
              }
            );
          });

        } else {
          this.error = 'No data available.';
          this.allVoitures = [];
          this.filteredVoitures = [];
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching cars:', error);
        this.error = 'Failed to load cars. Please try again.';
        this.loading = false;
      }
    );
  }

  // Called when filters are applied from app-find-car-form
  applyFilters(filters: any): void {
    console.log('Filters received in parent component:', filters);

    if (!filters || Object.keys(filters).length === 0) {
      this.filteredVoitures = [...this.allVoitures];
      return;
    }

    this.filteredVoitures = this.allVoitures.filter(voiture => {
      // Exact match pour chaque critère (case-insensitive)
      const matchBrand = !filters.brand || voiture.brand?.toLowerCase() === filters.brand.toLowerCase();
      const matchCategory = !filters.carType || voiture.category?.toLowerCase() === filters.carType.toLowerCase(); // <-- Correction ici
      const matchCarburant = !filters.carburant || voiture.carburant?.toLowerCase() === filters.carburant.toLowerCase();
      const matchToit = !filters.toit || voiture.toit?.toLowerCase() === filters.toit.toLowerCase();
      const matchTransmission = !filters.transmission || voiture.transmission?.toLowerCase() === filters.transmission.toLowerCase();
      const matchLocal = !filters.local || voiture.local?.toLowerCase() === filters.local.toLowerCase();

      return matchBrand && matchCategory && matchCarburant && matchToit && matchTransmission && matchLocal;
    });

    console.log('Filtered voitures:', this.filteredVoitures);
  }




  resetFilters(): void {
    this.filteredVoitures = [];
  }
}
