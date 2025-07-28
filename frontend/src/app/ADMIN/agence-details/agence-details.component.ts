import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgenceService } from '../../services/agence/agence.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Agence {
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
  selector: 'app-agence-details',
  templateUrl: './agence-details.component.html',
  styleUrls: ['./agence-details.component.css']
})
export class AgenceDetailsComponent implements OnInit {
  agency!: Agence;
  loading = false;
  hasChanges = false;

  constructor(
    private route: ActivatedRoute,
    private agenceService: AgenceService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const idParam = this.route.snapshot.paramMap.get('id');
    const agencyId = idParam ? +idParam : null;

    if (agencyId !== null) {
      this.agenceService.getAgenceById(agencyId).subscribe({
        next: (data) => {
          this.agency = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading agency by ID:', err);
          this.loading = false;
        }
      });
    } else {
      console.error('No agency ID provided in route');
      this.loading = false;
    }
  }

  onChange(): void {
    this.hasChanges = true;
  }

  updateAgency(): void {
    if (!this.agency) return;

    this.agenceService.updateAgence(this.agency.id, this.agency).subscribe({
      next: () => {
        this.hasChanges = false;
        alert('Agency updated successfully!');
      },
      error: (err) => {
        console.error('Error updating agency:', err);
        alert('Failed to update agency.');
      }
    });
  }
}
