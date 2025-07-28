import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(dialogTemplate: any): void {
    this.dialog.open(dialogTemplate);
  }
}
