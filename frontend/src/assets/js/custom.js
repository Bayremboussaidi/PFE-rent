/*
*document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");
  if (window.scrollY > 100) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
*/


// Wrap code in DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
  // Add null checks for elements
  const targetElement = document.querySelector('.your-element-class');

  if (targetElement) {
    targetElement.classList.add('your-class');
  } else {
    console.warn('Element not found for classList manipulation');
  }
});
