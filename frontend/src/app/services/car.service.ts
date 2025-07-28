import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  carData = [
    {
      id: 1,
      brand: "Seat",
      agence: "MyLoc",
      local: "Les berges du lac 2, Tunis",
      agenceLogo: 'assets/agns-img/agns-logo.jpg',
      rating: 112,
      carName: "Seat Ibiza Fr",
      imgUrl: 'assets/cars-img/seat-ibiza-fr.png',
      category: "Citadines",
      price: 150,
      toit: "Toit ouvrant",
      transmistion: "Auto",
      description: "Prenez le volant avec style! Louez votre voiture dès maintenant et explorez la ville sans limites."
    },
    {
      id: 2,
      brand: "Mercedes-Benz",
      agence: "MyLoc",
      local: "Les berges du lac 2, Tunis",
      agenceLogo: 'assets/agns-img/agns-logo.jpg',
      rating: 119,
      carName: "Mercedes CLA 180",
      imgUrl: 'assets/cars-img/mercedes-cla.png',
      category: "Luxe",
      price: 700,
      toit: "Toit panoramique",
      transmistion: "Auto",
      description: "Prenez la route en toute liberté avec My Loc ✨Louez la voiture parfaite pour chaque aventure !"
    },
    {
      id: 3,
      brand: "Audi",
      agence: "MyLoc",
      local: "Les berges du lac 2, Tunis",
      agenceLogo: 'assets/agns-img/agns-logo.jpg',
      rating: 82,
      carName: "Audi A3",
      imgUrl: 'assets/cars-img/audi-a3.png',
      category: "Luxe",
      price: 350,
      toit: "Toit panoramique",
      transmistion: "Auto",
      description: "Roulez en style avec notre AUDI A3."
    },
  ];

  constructor(private http: HttpClient) {}

  getCarData() {
    return this.carData;
  }



  private photosUrl = 'http://localhost:8084/api/photos/voiture';


  getCarImagesById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.photosUrl}/${id}`);
  }
}
