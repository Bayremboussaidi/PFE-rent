import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData: User = {
    role: 'USER' // Default role
  };

  previewImage: string | null = null;
  selectedFile: File | null = null;

  constructor(private userService: UserService, private router: Router) {}

  handleChange(event: any) {
    const { id, value } = event.target;
    this.userData[id as keyof User] = value;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
        this.userData.photo = this.previewImage; // Assign base64 to userData.photo
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewImage = null;
    this.selectedFile = null;
    this.userData.photo = undefined;
  }

  handleClick(event: Event) {
    event.preventDefault();

    this.userService.createUser(this.userData).subscribe(
      (response: User) => {
        console.log('User created successfully', response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error creating user', error);
      }
    );
  }
}
