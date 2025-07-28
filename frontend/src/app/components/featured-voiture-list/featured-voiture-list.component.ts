import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { BASE_URL } from '../../utils/config';


@Component({
  selector: 'app-featured-voiture-list',
  templateUrl: './featured-voiture-list.component.html',
  styleUrl: './featured-voiture-list.component.css'
})
export class FeaturedVoitureListComponent implements OnInit {
  /*featuredVoiture: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}
*/

  ngOnInit(): void {
    //this.fetchFeaturedVoitures();
  }

  /*
  fetchFeaturedVoitures(): void {
    this.http.get<any[]>(`/voitures/search/getFeaturedVoitures`)  // use ${BASE_URL//voitures/search/getFeaturedVoitures} here 
      .subscribe(
        (data) => {
          this.featuredVoiture = data;
          this.loading = false;
        },
        (err) => {
          this.error = err.message || 'An error occurred while fetching the data.';
          this.loading = false;
        }
      );
  }
*/
}







