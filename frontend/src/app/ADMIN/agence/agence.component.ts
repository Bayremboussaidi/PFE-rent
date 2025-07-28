import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AgenceService } from '../../services/agence/agence.service';

interface Agence {
  agencyName: string;
  email: string;
  password: string;
  phoneNumber: string;
  city: string;
  photo?: File;
}

interface AgenceResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  imageError: string = ''; // Error message for invalid image

  // Maximum allowed file size (2MB in bytes)
  maxFileSize = 2 * 1024 * 1024;

  constructor(
    private fb: FormBuilder,
    private agenceService: AgenceService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      agencyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s()-]{7,}$/)]],
      city: ['', Validators.required]
    });
  }

  // Handle file selection and validate size
  onFileChange(event: any) {
    const file = event.target.files[0];

    // Reset error message
    this.imageError = '';

    if (file) {
      // Check file size
      if (file.size > this.maxFileSize) {
        this.imageError = 'File size exceeds the maximum allowed size of 2MB.';
        return;
      }

      // If file is valid, proceed with preview
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove image from preview
  removeImage() {
    this.previewImage = null;
    this.selectedFile = null;
    this.imageError = '';  // Clear error message
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset file input
    }
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.markFormGroupTouched(this.signupForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Convert to FormData for file upload
    const formData = new FormData();
    formData.append('agencyName', this.signupForm.value.agencyName);
    formData.append('email', this.signupForm.value.email);
    formData.append('password', this.signupForm.value.password);
    formData.append('phoneNumber', this.signupForm.value.phoneNumber);
    formData.append('city', this.signupForm.value.city);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.agenceService.createAgence(formData)
      .pipe(
        catchError(error => {
          this.isLoading = false;
          this.errorMessage = error.message || 'An error occurred during signup';
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response?.success) {
            this.router.navigate(['/login'], {
              state: { successMessage: 'Agency created successfully! Please login.' }
            });
          } else {
            this.errorMessage = response?.message || '';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'An error occurred during signup';
        }
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
