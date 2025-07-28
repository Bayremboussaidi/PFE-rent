import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service'; // Assuming you have an AuthService for authentication

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navLinks = [
    { path: '/home', display: 'Accueil' },
    { path: '/about', display: 'À propos' },
    { path: '/listcars', display: 'Voitures' },
    { path: '/blogs', display: 'Blogs' },
    { path: '/contact', display: 'Contact' },
  ];

  user: any; // This should be defined based on your AuthService
  @ViewChild('header') headerRef!: ElementRef;
  @ViewChild('menu') menuRef!: ElementRef;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    //this.user = this.authService.getUser();
    this.stickyHeader();
  }

  stickyHeader() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        this.headerRef.nativeElement.classList.add('sticky__header');
      } else {
        this.headerRef.nativeElement.classList.remove('sticky__header');
      }
    });
  }

  toggleMenu() {
    this.menuRef.nativeElement.classList.toggle('menu__active');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
