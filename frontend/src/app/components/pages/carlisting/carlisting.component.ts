import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VoitureService } from '../../../services/voiture.service';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';
import { UserloginService } from '../../../services/user_login/userlogin.service';

@Component({
  selector: 'app-listcars',
  templateUrl: './carlisting.component.html',
  styleUrls: ['./carlisting.component.css']
})
export class ListcarsComponent implements OnInit {
  currentPage = 1; // Active page
  totalPages = 1; // Total number of pages
  itemsPerPage = 4; // Cars displayed per page
  totalVoitures = 0; // Total number of cars

  showSignInPrompt = false; // Sign-in prompt visibility

  voitures: any[] = []; // Displayed cars for the current page
  filteredVoitures: any[] = []; // Filtered list of cars
  loading = false; // Controls spinner visibility
  error: string = ''; // Error message for failed API calls

  // Booking modal state
  showBookingModal = false;
  selectedCar: any = null;

  allVoitures: any[] = []; // Full list of cars fetched from the backend

  constructor(
    private voitureService: VoitureService,
    private BookingService: BookingService,
    private router: Router,
    public UserloginService: UserloginService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchAllVoitures(); // Fetch cars on initialization
  }

  // Open the booking modal
  openBookingModal(voiture: any): void {
    console.log('Is user logged in?', this.isLoggedIn);

    if (this.isLoggedIn) {
      console.log('Booking car:', voiture);
      this.selectedCar = voiture; // Store car details
      this.showBookingModal = true; // Show modal
    } else {
      this.showSignInPrompt = true;
      this.cd.detectChanges(); // Detect changes for modal visibility
    }
  }

  // Navigate to login page and close sign-in prompt
  navigateToLogin(): void {
    this.router.navigate(['/login']);
    this.closeSignInPrompt();
  }

  // Close sign-in prompt
  closeSignInPrompt(): void {
    this.showSignInPrompt = false;
  }

  // Check login status
  get isLoggedIn(): boolean {
    return this.UserloginService.isLoggedIn();
  }

  // Close booking modal
  closeBookingModal(): void {
    console.log('Closing modal');
    this.showBookingModal = false;
  }


// Fetch all cars from the backend
fetchAllVoitures(): void {
  this.loading = true;
  this.voitureService.getVoitures().subscribe(
    (response: any) => {
      console.log('API Response:', response);
      if (response && response.data) {
        this.allVoitures = response.data;
        this.filteredVoitures = [...this.allVoitures]; // Initialize filteredVoitures with all cars

        // Fetch images for each car and set the default image if none exists
        this.allVoitures.forEach((voiture: any) => {
          this.voitureService.getCarImageById(voiture.id).subscribe(
            (photos: any[]) => {
              if (photos?.length > 0) {
                voiture.imgUrl = `data:${photos[0].type};base64,${photos[0].base64Data}`;
              } else {
                voiture.imgUrl = '/assets/default-car.jpg'; // Default image
              }
            },
            (error:any) => {
              console.error(`Error fetching images for voiture ${voiture.id}:`, error);
              voiture.imgUrl = '/assets/default-car.jpg'; // Default on error
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


  // Update the displayed cars based on the current page
  updateDisplayedVoitures(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.voitures = this.filteredVoitures.slice(startIndex, endIndex); // Slice the filtered cars for the current page
  }





  async applyFilters(filters: any): Promise<void> {
    const pickupDate = filters.pickupDate ? new Date(filters.pickupDate) : null;
    const dropoffDate = filters.dropoffDate ? new Date(filters.dropoffDate) : null;

    const filtered: any[] = [];

    for (const voiture of this.allVoitures) {
      // Filter by location
      if (filters.local && voiture.local.toLowerCase() !== filters.local.toLowerCase()) {
        continue;
      }

      // Filter by car type
      if (filters.carType && voiture.category.toLowerCase() !== filters.carType.toLowerCase()) {
        continue;
      }

      // Availability check only if both dates exist
      if (pickupDate && dropoffDate) {
        try {
          const unavailableResponse = await this.BookingService.getUnavailableDates(voiture.id).toPromise();
          const unavailablePeriods = unavailableResponse?.unavailableDates || []; // Safely access array

          // Check for overlap with ANY unavailable period
          const hasOverlap = unavailablePeriods.some((period: any) => {
            const periodStart = new Date(period.startDate);
            const periodEnd = new Date(period.endDate);
            return pickupDate <= periodEnd && dropoffDate >= periodStart;
          });

          if (hasOverlap) continue; // Skip car if overlap exists

        } catch (err) {
          console.error('Error fetching availability for voiture', voiture.id, err);
          continue; // Skip on error (or include based on your error handling policy)
        }
      }

      filtered.push(voiture); // Passed all filters
    }

    // Sorting logic remains unchanged
    this.filteredVoitures = [...filtered].sort((a, b) => {
      if (a.agence === 'mylock' && b.agence !== 'mylock') return -1;
      if (b.agence === 'mylock' && a.agence !== 'mylock') return 1;
      if (filters.carType) {
        if (a.category === filters.carType && b.category !== filters.carType) return -1;
        if (b.category === filters.carType && a.category !== filters.carType) return 1;
      }
      if (filters.local) {
        if (a.local === filters.local && b.local !== filters.local) return -1;
        if (b.local === filters.local && a.local !== filters.local) return 1;
      }
      return 0;
    });

    // Pagination updates
    this.totalVoitures = this.filteredVoitures.length;
    this.totalPages = Math.ceil(this.totalVoitures / this.itemsPerPage);
    this.currentPage = 1;
    this.updateDisplayedVoitures();
  }




  //reset the search
  // Add to listcars.component.ts
resetFilters(): void {
  this.filteredVoitures = [...this.allVoitures];
  this.totalVoitures = this.filteredVoitures.length;
  this.totalPages = Math.ceil(this.totalVoitures / this.itemsPerPage);
  this.currentPage = 1;
  this.updateDisplayedVoitures();
}
}
