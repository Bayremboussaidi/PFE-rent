/*import { AgenceService } from './../../../services/agence/agence.service'; // Corrected path
import { UserloginService } from './../../../services/user_login/userlogin.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin/admin.service';

//import {KeycloakUserInfo} from'../../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';
  isRobot = true;
  isUser = false;
  isAgence = false;
  showRobotError = false;
  showConditions = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userloginService: UserloginService,
    private adminService: AdminService,
    //private keycloakService: KeycloakUserInfo,
    private agenceService: AgenceService // Corrected variable name casing
  ) {}

  closeConditions() {
    this.showConditions = false;
  }

  handleClick(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.showRobotError = false;

    if (!this.isRobot) {
      this.showRobotError = true;
      return;
    }

    if (!this.validateEmail(this.credentials.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      return;
    }

    if (this.isUser) {
      this.handleUserLogin();
    } else if (this.isAgence) {
      this.handleAgencyLogin();
    } else if (!this.isUser && !this.isAgence) {

      this.handleAdminLogin()
      //this.handleKeycloakLogin();
    }
  }

  private handleUserLogin() {
    this.authService.logout();
    this.userloginService.login(this.credentials).subscribe({
      next: (response) => {
        this.userloginService.storeUserDetails(response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err?.message || 'Email ou mot de passe incorrect';
      }
    });
  }

  private handleAgencyLogin() {
    this.authService.logout();
    this.agenceService.login(this.credentials).subscribe({
      next: (response:any) => {
        // Store agency auth data
        const agencyData = {
          token: response.token,
          agencyId: response.id,
          name: response.agencyName
        };

        localStorage.setItem('agency_auth', JSON.stringify(agencyData));

        // Log the stored data
        console.log('LocalStorage after agency login:');
        console.log('agency_auth:', JSON.parse(localStorage.getItem('agency_auth') || 'No agency data'));
        console.log('All localStorage:', localStorage);

        this.router.navigate(['/agence']);
      },
      error: (err:any) => {
        this.errorMessage = err?.message || 'Email ou mot de passe incorrect pour agence';
      }
    });
  }




  private handleAdminLogin() {
    // Log out the user first (clearing any existing session data)
    this.authService.logout();

    // Clear all previous stored data related to old user logins
    localStorage.removeItem('admin_auth');  // Removes old admin data from localStorage
    localStorage.removeItem('agency_auth'); // Removes any previous agency data
    localStorage.removeItem('agency_data'); // Removes any previous agency-specific data

    // Call the login method from the adminService
    this.adminService.login(this.credentials).subscribe({
      next: (response: any) => {
        // Store the new admin details in localStorage
        const adminData = {
          username: response.username,
          email: response.email,
          phone: response.phone,
          workplace: response.workplace,
          roles: response.roles || "ADMIN" // Default to "ADMIN" if no role is provided
        };

        // Save the new admin details to localStorage
        localStorage.setItem('admin_auth', JSON.stringify(adminData));

        // Log the stored data for debugging
        console.log('LocalStorage after admin login:');
        console.log('admin_auth:', JSON.parse(localStorage.getItem('admin_auth') || '{}'));
        console.log('All localStorage:', localStorage);

        // Navigate based on the role (check if it's "ADMIN")
        if (response.roles === 'ADMIN') {
          this.router.navigate(['/admin/bookinga']);
        } else {
          this.errorMessage = 'Unauthorized role'; // Set an error message if the role is unexpected
        }
      },
      error: (err: any) => {
        // Handle errors (e.g., invalid credentials)
        this.errorMessage = err?.error?.error_description || 'Email or password incorrect (admin)';
      }
    });
  }









  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  toggleCheck(type: 'user' | 'agence') {
    this.isUser = type === 'user';
    this.isAgence = type === 'agence';
  }
}







  //keycloak login
  /*private handleKeycloakLogin() {
    this.authService.logout(); // Clear any existing tokens

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Store the tokens and user details
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('role', response.role);

        // Decode and store user details
        const userDetails = this.authService.decodeToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(userDetails));

        // Navigate based on role
        //this.navigateBasedOnRole(response.role);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.error_description || 'Email ou mot de passe incorrect';
      }
    });
  }*/
   // Keycloak login

  /*private async handleKeycloakLogin() {
    try {
      this.authService.logout(); // Clear any existing tokens

      // Init Keycloak first
      const initialized = await this.keycloakService.init();
      if (!initialized) {
        // If not authenticated, start login process
        this.keycloakService.login();
        return;
      }

      // If we get here, user is already authenticated
      const token = await this.keycloakService.getToken();
      const userDetails = this.keycloakService.currentUser;

      if (userDetails) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('role', userDetails.role || 'USER');
        localStorage.setItem('user', JSON.stringify(userDetails));

        // Redirect based on role
        if (userDetails.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      } else {
        this.errorMessage = 'Failed to load user details';
      }
    } catch (error) {
      this.errorMessage = `Keycloak login error: ${error}`;
    }
  }*/





    import { AgenceService } from './../../../services/agence/agence.service';
import { UserloginService } from './../../../services/user_login/userlogin.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';
  isRobot = true;
  showRobotError = false;
  showConditions = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userloginService: UserloginService,
    private adminService: AdminService,
    private agenceService: AgenceService
  ) {}

  closeConditions() {
    this.showConditions = false;
  }

  handleClick(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.showRobotError = false;

    if (!this.isRobot) {
      this.showRobotError = true;
      return;
    }

    if (!this.validateEmail(this.credentials.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      return;
    }

    this.tryAdminLogin();
  }

  private tryAdminLogin() {
    this.authService.logout();
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('agency_auth');
    localStorage.removeItem('agency_data');

    this.adminService.login(this.credentials).subscribe({
      next: (response: any) => {
        const adminData = {
          username: response.username,
          email: response.email,
          phone: response.phone,
          workplace: response.workplace,
          roles: response.roles || "ADMIN"
        };

        localStorage.setItem('admin_auth', JSON.stringify(adminData));
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.tryUserLogin();
      }
    });
  }

  private tryUserLogin() {
    this.authService.logout();

    this.userloginService.login(this.credentials).subscribe({
      next: (response) => {
        this.userloginService.storeUserDetails(response.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.tryAgencyLogin();
      }
    });
  }

  private tryAgencyLogin() {
    this.authService.logout();

    this.agenceService.login(this.credentials).subscribe({
      next: (response: any) => {
        const agencyData = {
          token: response.token,
          agencyId: response.id,
          name: response.agencyName
        };

        localStorage.setItem('agency_auth', JSON.stringify(agencyData));
        this.router.navigate(['/agence']);
      },
      error: () => {
        this.errorMessage = 'Email ou mot de passe incorrect pour tous les rôles';
      }
    });
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
