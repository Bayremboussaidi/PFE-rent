import { Component } from '@angular/core';
import { EmailService } from '../../../services/email.service';
import { UserloginService } from '../../../services/user_login/userlogin.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  showSignInPrompt = false;

  constructor(private emailService: EmailService , private router: Router, public UserloginService: UserloginService) {
    this.initializeUserDetails();
  }



  private initializeUserDetails(): void {
    const user = this.UserloginService.getCurrentUser();
    if (user) {
      this.name = user.username || ''; // Fetch username from the logged-in user
      this.email = user.email || '';   // Fetch email from the logged-in user
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
    this.closeSignInPrompt();
  }

  closeSignInPrompt(): void {
    this.showSignInPrompt = false;
  }

  get isLoggedIn(): boolean {
    return this.UserloginService.isLoggedIn();
  }




  sendMessage() {
    if (this.isLoggedIn) {
      const user = this.UserloginService.getCurrentUser();

      const emailToUse = user?.email || this.email; // Use logged-in user's email or provided email

      if (emailToUse) {
        const emailRequest = {
          name: user?.username || '',
          email: emailToUse,
          message: this.message,
        };

        this.emailService.sendEmail(emailRequest).subscribe(
          response => {
            console.log('Email sent successfully', response);
            this.message = 'success sent';

            // Clear the message after 3 seconds
            setTimeout(() => {
              this.message = '';
            }, 3000);
          },
          error => {
            console.error('Error sending email', error);
          }
        );
      } else {
        console.error('Unable to retrieve email for sending message.');
      }
    } else {
      this.showSignInPrompt = true;
    }
  }




  socialLinks = [
    {
      url: 'https://www.facebook.com/profile.php?id=61567175341859',
      icon: 'ri-facebook-line',
    },
    {
      url: 'https://www.instagram.com/myloc.lac.2/',
      icon: 'ri-instagram-line',
    }
  ];

}
