

import { Router } from '@angular/router';


import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-become-driver-section',
  templateUrl: './become-driver-section.component.html',
  styleUrl: './become-driver-section.component.css'
})
export class BecomeDriverSectionComponent implements OnInit {
  constructor(private router: Router) {}
  backgroundImage = '../../../assets/all-images/drive.jpg';

  testimonials = [
    {
      text: "The road stretches far beneath the moon's soft glow,\nAs night whispers secrets only travelers know.\nThe hum of the engine, a comforting sound,\nWhile the world fades away, no distractions are found.",
      author: "Night Rider",
      company: "A Lover of the Open Road"
    },
    {
      text: "Under the starlit sky, my hands grip the wheel,\nA sense of freedom only night drives can reveal.\nThe city sleeps, but I roam with pride,\nChasing the horizon with nowhere to hide.",
      author: "Wandering Soul",
      company: "The Night Adventurer"
    },
    {
      text: "The headlights cut through the darkened night,\nGuiding my journey, a peaceful flight.\nIn the stillness of night, I find my pace,\nWith every mile, I embrace the space.",
      author: "Lone Traveler",
      company: "Explorer of the Night"
    }
  ];

  activeSlide = 0;
  interval: any;
  cursorStyle = 'default';

  ngOnInit() {
    this.startAutoSlide();
  }

  setActiveSlide(index: number) {
    this.activeSlide = index;
    this.resetAutoSlide();
  }

  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.testimonials.length;
    this.resetAutoSlide();
  }

  prevSlide() {
    this.activeSlide = (this.activeSlide - 1 + this.testimonials.length) % this.testimonials.length;
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change every 5 seconds
  }

  resetAutoSlide() {
    clearInterval(this.interval);
    this.startAutoSlide();
  }

  /* Detect Mouse Movement to Change Cursor */
  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    const screenWidth = window.innerWidth;
    const mouseX = event.clientX;

    if (mouseX < screenWidth / 2) {
      this.cursorStyle = "w-resize"; // Change to `<` when moving left
    } else {
      this.cursorStyle = "e-resize"; // Change to `>` when moving right
    }
  }


  navigateToCars(){
    this.router.navigate(['/listcars']);

  }

  /* Handle Click to Change Slide */
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const screenWidth = window.innerWidth;
    const clickX = event.clientX;

    if (clickX < screenWidth / 2) {
      this.prevSlide(); // Click left = Previous slide
    } else {
      this.nextSlide(); // Click right = Next slide
    }
  }
}
