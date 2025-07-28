import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements AfterViewInit {
  testimonials = [
    {
      text: "Super application, très intuitive et facile à utiliser. Je recommande vivement !",
      image: "assets/testimonials/bassem.jpg",
      name: "Bassem Ajengui",
      role: "Ceo & Founder"
    },
    {
      text: "Franchement, rien à dire ! Les voitures sont top et le service hyper pro.",
      image: "assets/testimonials/assyl.jpg",
      name: "Assyl Kria",
      role: "Designer"
    },
    {
      text: "J’ai adoré la facilité de réservation et la qualité des véhicules proposés",
      image: "assets/testimonials/bay.jpg",
      name: "Bayrem Boussaidi",
      role: "Store Owner"
    },
    {
      text: "Une des meilleures agences de location de voitures, je reviendrai sans hésiter.",
      image: "assets/testimonials/aymn.jpg",
      name: "Aymen Arfaoui",
      role: "Freelancer"
    },
    {
      text: "Je suis très satisfait du service, les prix sont abordables et les voitures impeccables.",
      image: "assets/testimonials/mob.jpg",
      name: "Mouhib Touati",
      role: "Entrepreneur"
    }
  ];

  ngAfterViewInit() {
    new Swiper('.mySwiper', {
      modules: [Pagination, Autoplay],
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 1
        }
      }
    });
  }
}
