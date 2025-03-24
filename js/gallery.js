document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;

    // DOM Elements
    const mainImage = document.getElementById("mainImage");
    const vehicleName = document.getElementById("vehicleName");
    const vehiclePrice = document.getElementById("vehiclePrice");
    const vehicleMileage = document.getElementById("vehicleMileage");
    const vehicleFuelEfficiency = document.getElementById("vehicleFuelEfficiency");
    const vehicleDrivetrain = document.getElementById("vehicleDrivetrain");
    const vehicleTransmission = document.getElementById("vehicleTransmission");
    const detailsLink = document.getElementById("detailsLink");

    const thumbnails = document.querySelectorAll(".thumbnail");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Function to update main display
    function updateMainDisplay(index) {
        const vehicle = vehicles[index];
        mainImage.src = vehicle.image;
        mainImage.alt = vehicle.name;
        vehicleName.textContent = vehicle.name;
        vehiclePrice.textContent = vehicle.price.toLocaleString();
        vehicleMileage.textContent = vehicle.mileage;
        vehicleFuelEfficiency.textContent = vehicle.fuelEfficiency;
        vehicleDrivetrain.textContent = vehicle.drivetrain;
        vehicleTransmission.textContent = vehicle.transmission;
        detailsLink.href = `/vehicles/${vehicle.id}`;
        currentIndex = index;
    }

    // Add click event to thumbnails
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", (event) => {
            currentIndex = parseInt(event.target.dataset.index);
            updateMainDisplay(currentIndex);
        });
    });

    // Navigation buttons
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + vehicles.length) % vehicles.length;
        updateMainDisplay(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % vehicles.length;
        updateMainDisplay(currentIndex);
    });

    // Initialize gallery with first vehicle
    updateMainDisplay(currentIndex);
});
