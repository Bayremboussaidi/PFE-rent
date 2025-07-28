// shared/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin/admin.service';
import { AgenceService } from '../services/agence/agence.service';

@Injectable({
  providedIn: 'root'
})
export class SHaredGuard implements CanActivate {

  constructor(
    private adminService: AdminService,
    private agenceService: AgenceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if user is logged in as admin or agence
    const isAdminLoggedIn = this.adminService.isLoggedIn();
    const isAgenceLoggedIn = this.agenceService.isLoggedIn();

    if (isAdminLoggedIn || isAgenceLoggedIn) {
      return true; // Allow access if logged in as either admin or agence
    } else {
      // Redirect to login if neither is logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}
