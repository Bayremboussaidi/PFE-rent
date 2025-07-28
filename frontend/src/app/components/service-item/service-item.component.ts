// service-item.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.css']
})
export class ServiceItemComponent {
  @Input() item!: any; // Define input property to receive data from parent
}