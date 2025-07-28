import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FollowerService } from '../../services/follower.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';

  constructor(private http: HttpClient, private followerService :FollowerService ) {}


  currentYear: number = new Date().getFullYear();





    subscribeToNewsletter() {
      if (!this.email) {
        alert('Please enter a valid email address');
        return;
      }

      this.followerService.addFollower(this.email).subscribe({
        next: (response) => {
          console.log('Subscription processed'); // Optional UI feedback
          this.email = 'Added Successfully';
        },
        error: (error) => {
          // This will no longer trigger since backend doesn't throw
          this.email = '';
        }
      });
    }

  quickLinks = [
    { path: '/home', display: 'Accueil' },
    { path: '/about', display: 'À Propos' },
    { path: '/services', display: 'Services' },
    { path: '/contact', display: 'Contact' },
    { path: '/faq', display: 'FAQ' }
  ];
}
