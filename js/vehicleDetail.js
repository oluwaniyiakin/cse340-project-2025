document.addEventListener("DOMContentLoaded", function () {
    console.log("🚗 Vehicle Detail Page Loaded!");

    // Get the main image element
    const mainImage = document.getElementById("mainImage");

    // Get all thumbnails
    const thumbnails = document.querySelectorAll(".thumbnail");

    // Check if elements exist
    if (!mainImage || thumbnails.length === 0) {
        console.error("❌ Main image or thumbnails not found!");
        return;
    }

    // Add click event listener to each thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            console.log("🖼️ Thumbnail clicked:", this.src);
            mainImage.src = this.src; // Change main image source
        });
    });
});
