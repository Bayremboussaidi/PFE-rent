import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-section',
  templateUrl: './common-section.component.html',
  styleUrls: ['./common-section.component.css']
})
export class CommonSectionComponent {
  @Input() title: string = '';
}
