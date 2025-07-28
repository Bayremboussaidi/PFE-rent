import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head-agence',
  templateUrl: './head-agence.component.html',
  styleUrl: './head-agence.component.css'
})
export class HeadAgenceComponent {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}




  onLogout(){

    this.authService.logout();

    // Clear all previous stored data related to old user logins
    localStorage.removeItem('admin_auth');  // Removes old admin data from localStorage
    localStorage.removeItem('agency_auth'); // Removes any previous agency data
    localStorage.removeItem('agency_data'); // Removes any previous agency-specific data

    this.router.navigate(['/login']);

  }

}








