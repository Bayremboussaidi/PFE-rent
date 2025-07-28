import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AgenceService } from '../../services/agence/agence.service';

interface AgenceResponse {
  id: number;
  agencyName: string;
  email: string;
  phoneNumber: string;
  city: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-show-agence',
  templateUrl: './show-agence.component.html',
  styleUrls: ['./show-agence.component.css']
})
export class ShowAgenceComponent implements OnInit {
  agencies: AgenceResponse[] = [];
  isLoading = false;
  errorMessage = '';

  // Inject the router into the constructor
  constructor(private agenceService: AgenceService, private router: Router) {}

  ngOnInit(): void {
    this.agenceService.getAllAgences().subscribe(
      (data) => {
        this.agencies = data;
      },
      (error) => {
        console.error('Error fetching agencies', error);
      }
    );
  }

  // Correct method to navigate using agencyName
  viewAgencyDetails(agencyName: string): void {
    console.log(`Navigating to details for ${agencyName}`);
    this.router.navigate(['/agence/carlista'], {
      queryParams: { agencyName: agencyName }
    });
  }

  // Correct method to delete agency
  deleteAgency(agency: AgenceResponse): void {
    if (confirm(`Are you sure you want to delete the agency: ${agency.agencyName}?`)) {
      this.isLoading = true;
      this.agenceService.deleteAgence(agency.id).subscribe(
        () => {
          this.isLoading = false;
          // Remove the deleted agency from the list
          this.agencies = this.agencies.filter(a => a.id !== agency.id);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Error deleting agency';
        }
      );
    }
  }




  editAgency(agency: AgenceResponse): void {
    console.log(`Navigating to edit details for ${agency.id}`);
    this.router.navigate(['/admin/show-agence', agency.id]);

  }
}
