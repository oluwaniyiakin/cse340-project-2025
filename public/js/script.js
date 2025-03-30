// public/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Script.js loaded successfully!");
  
    // Check if we're on a vehicle detail page with thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
  
    if (thumbnails && mainImage) {
      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
          // Update the main image source when a thumbnail is clicked
          mainImage.src = this.src;
        });
      });
    }
  
    // Additional functionality can be added here, such as handling modal displays,
    // responsive navigation toggles, or other interactive components.
  });
  