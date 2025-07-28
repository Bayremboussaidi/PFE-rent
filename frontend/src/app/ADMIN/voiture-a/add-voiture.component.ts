/*import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../../services/voiture.service';
import { Voiture } from '../../models/voiture.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-voiture-table',
  templateUrl: './add-voiture.component.html',
  styleUrls: ['./add-voiture.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AddVoitureComponent implements OnInit {
  voitures: Voiture[] = []; // List of cars
  newCar: Voiture = {} as Voiture;
  isAddModalOpen: boolean = false;
  page: number = 0; // Pagination
  errors: string[] = []; // Error messages

  constructor(
    private voitureService: VoitureService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

  }



  // Open modal to add a car
  openAddModal(): void {
    this.newCar = {} as Voiture; // Reset form
    this.isAddModalOpen = true; // Show modal
  }

  // Close modal
  closeAddModal(): void {
    this.isAddModalOpen = false; // Hide modal
  }

  // Handle form submission
  onAddCar(): void {
    this.voitureService.addVoiture(this.newCar).subscribe({
      next: (response) => {
        this.voitures.push(response); // Add new car to list
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Car added successfully',
        });
        this.closeAddModal();
      },
      error: (err) => {
        this.errors.push('Failed to add car: ' + err.message);
      },
    });
  }

  // Delete car
  deleteCar(id: number | undefined, index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this car?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.voitures.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Car deleted successfully',
        });
      },
    });
  }
}
*/
