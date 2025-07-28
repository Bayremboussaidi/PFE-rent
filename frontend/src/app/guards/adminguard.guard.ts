/*import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect unauthorized users
      return false;
    }
  }
}*/
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AdminService } from '../services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.adminService.isLoggedIn()) {
      return true;
    }

    // Redirect to login if admin not logged in
    return this.router.createUrlTree(['/login']);
  }
}
