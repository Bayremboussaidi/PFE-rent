import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {
  @Input() aboutClass: string | undefined;
  aboutImg: string = 'assets/all-images/cars-img/audi-a3.png';
  marginTop: string | undefined;

  ngOnInit(): void {
    this.marginTop = this.aboutClass === 'aboutPage' ? '0px' : '280px';
  }
}