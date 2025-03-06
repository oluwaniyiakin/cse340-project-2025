document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    // Toggle navigation menu on button click
    navToggle.addEventListener("click", function () {
        navMenu.classList.toggle("open"); // Add/remove class to show/hide menu
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove("open");
        }
    });

    // Allow closing menu with Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navMenu.classList.remove("open");
        }
    });
});
