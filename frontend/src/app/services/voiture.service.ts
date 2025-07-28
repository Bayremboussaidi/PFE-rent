import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PhotoResponseDTO } from '../models/PhotoResponseDTO.model';
import { Voiture } from '../models/voiture.model';
import { ApiResponseAgence } from '../models/ApiResponseAgence';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  private baseUrl = 'http://localhost:8084/api/voitures';

  constructor(private http: HttpClient) {}

  getVoitures(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);  // Removed page parameter for all voitures
  }

  getVoitureCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/getVoitureCount`);
  }

  getVoitureById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addVoiture(voiture: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, voiture); // Remove the .pipe(map(...))
  }


    // New method: Delete a voiture by ID
    deleteVoiture(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }




  // Added method for fetching a single voiture by ID
  getOneVoiture(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

    // Added method to fetch all voitures with details
    getAllVoituresWithDetails(): Observable<any> {
      return this.http.get(`${this.baseUrl}/all/details`);
    }



    getVoituresByAgence(agenceName: string): Observable<ApiResponseAgence> {
      return this.http.get<ApiResponseAgence>(
        `${this.baseUrl}/agence/${encodeURIComponent(agenceName)}`
      );
    }







  //get reviews for each voiture
  getReviewsForVoiture(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/reviews`);
  }



//update
updateVoiture(id: number, voiture: Voiture, file?: File): Observable<any> {
  const formData = new FormData();
  formData.append('voiture', new Blob([JSON.stringify(voiture)], {
    type: 'application/json'
  }));

  if (file) {
    formData.append('file', file);
  }

  return this.http.put(`${this.baseUrl}/${id}`, formData);
}

getCarImageById(id: number): Observable<PhotoResponseDTO[]> {
    return this.http.get<PhotoResponseDTO[]>(
      `http://localhost:8084/api/photos/voiture/${id}`
    );
  }

}
