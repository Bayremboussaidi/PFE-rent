import { Component } from '@angular/core';
import * as AOS from 'aos';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'comparateur';

  ngOnInit(): void {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,     // Whether animation should happen only once
      offset: 200     // Offset (in px) from the original trigger point
    });

}
}
