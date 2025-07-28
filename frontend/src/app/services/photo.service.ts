
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class PhotoService {
    private apiUrl = `http://localhost:8084/api/photos`;

    constructor(private http: HttpClient) { }

    // Upload multiple photos for a specific car (voiture)
    uploadPhotos(voitureId: number, logoFile: File | null, files: File[]): Observable<any> {
      const formData: FormData = new FormData();
      files.forEach(file => {
        formData.append('files', file, file.name);
      });

      return this.http.post(`${this.apiUrl}/upload/${voitureId}`, formData);
    }

    // Retrieve all photos by voitureId
    getPhotosByVoitureId(voitureId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/voiture/${voitureId}`);
    }

    // Delete all photos for a specific voiture
    deletePhotosByVoitureId(voitureId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/voiture/${voitureId}`);
    }
  }
