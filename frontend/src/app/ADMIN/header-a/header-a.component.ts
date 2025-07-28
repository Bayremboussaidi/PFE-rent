import { Component, HostListener } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-a',
  templateUrl: './header-a.component.html',
  styleUrl: './header-a.component.css'
})
export class HeaderAComponent {
  isDropdownVisible: boolean =false;

  /*toggleDropdown(event: MouseEvent): void {
    event.preventDefault(); // Correct, no deprecation warning
    this.isDropdownVisible = !this.isDropdownVisible;
  }*/


    constructor(
      private authService: AuthService,
      private router: Router
    ) {}


  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }


  // Close dropdown when clicking outside of it
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const dropdown = document.querySelector('.dropdown');
    const button = event.target as HTMLElement;

    // Close the dropdown if clicked outside the button or dropdown
    if (dropdown && !dropdown.contains(button)) {
      this.isDropdownVisible = false;
    }
  }





  onLogout(){

    this.authService.logout();

    // Clear all previous stored data related to old user logins
    localStorage.removeItem('admin_auth');  // Removes old admin data from localStorage
    localStorage.removeItem('agency_auth'); // Removes any previous agency data
    localStorage.removeItem('agency_data'); // Removes any previous agency-specific data

    this.router.navigate(['/login']);

  }
}

