import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-find-car-form',
  templateUrl: './find-car-form.component.html',
  styleUrls: ['./find-car-form.component.css']
})
export class FindCarFormComponent {

  @ViewChild('localInput') localInput!: ElementRef;
  @ViewChild('pickupDateInput') pickupDateInput!: ElementRef;
  @ViewChild('dropoffDateInput') dropoffDateInput!: ElementRef;
  @ViewChild('numPlacesInput') numPlacesInput!: ElementRef;
  @ViewChild('carTypeInput') carTypeInput!: ElementRef;

  @Output() searchFilters = new EventEmitter<any>();
  @Output() resetFilters = new EventEmitter<void>();

  constructor(private bookingService: BookingService) {}

  searchHandler() {
    const filters: any = {
      local: this.localInput.nativeElement.value.trim(),
      pickupDate: this.pickupDateInput.nativeElement.value || null,
      dropoffDate: this.dropoffDateInput.nativeElement.value || null,
      numPlaces: this.numPlacesInput.nativeElement.value || null,
      carType: this.carTypeInput.nativeElement.value || null
    };

    // Clean up empty fields
    Object.keys(filters).forEach(key => {
      if (!filters[key]) delete filters[key];
    });

    // Require pickup and dropoff dates to filter by availability
   /* if (!filters.pickupDate || !filters.dropoffDate) {
      alert("Please enter both pickup and dropoff dates to search for available cars.");
      return;
    }*/
    if (filters.pickupDate > filters.dropoffDate ) {
      alert("Pick up date cannot be later than drop off date.");
      return;
    }

    // Emit filters to parent (e.g. ListcarsComponent)
    this.searchFilters.emit(filters);
  }

  resetHandler() {
    // Reset all inputs
    this.localInput.nativeElement.value = '';
    this.pickupDateInput.nativeElement.value = '';
    this.dropoffDateInput.nativeElement.value = '';
    this.numPlacesInput.nativeElement.value = '';
    this.carTypeInput.nativeElement.value = '';

    // Emit reset event to parent
    this.resetFilters.emit();
  }
}
