import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  driverImg: string = 'assets/all-images/drive.jpg'; // Update the path as per your Angular project
  contactNumber: string = '+216 27 932 190';
}
