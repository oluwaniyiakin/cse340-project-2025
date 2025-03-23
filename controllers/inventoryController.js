const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");
const path = require("path"); 
const fs = require("fs");

// ✅ Get all vehicles and set the first one as default
async function getVehicleDetails(req, res) {
    try {
        console.log("🔍 Fetching all vehicles...");

        // Fetch all vehicles from the database
        const vehicles = await inventoryModel.getAllVehicles();

        if (!vehicles || vehicles.length === 0) {
            console.error("❌ No vehicles found!");
            return res.status(404).render("error", { 
                title: "No Vehicles Available", 
                message: "Currently, there are no vehicles available in our inventory." 
            });
        }

        // ✅ Select the first vehicle as default
        let selectedVehicle = vehicles[0];

        // If a specific vehicle ID is provided, fetch that one
        const vehicleId = parseInt(req.params.inventory_id, 10);
        if (!isNaN(vehicleId)) {
            const vehicle = vehicles.find(v => v.inv_id === vehicleId);
            if (vehicle) selectedVehicle = vehicle;
        }

        // ✅ Ensure images exist, fallback to "no-image.png" if missing
        selectedVehicle.inv_image = getVehicleImage(selectedVehicle.inv_model);
        selectedVehicle.inv_thumbnail = getVehicleThumbnail(selectedVehicle.inv_model);

        // ✅ Format price and mileage correctly
        selectedVehicle.inv_price = utilities.formatCurrency(selectedVehicle.inv_price);
        selectedVehicle.inv_miles = utilities.formatNumber(selectedVehicle.inv_miles);

        // ✅ Render the view with all vehicles (for thumbnails) and the selected vehicle
        res.render("inventory/vehicle-detail", {
            title: `${selectedVehicle.inv_year} ${selectedVehicle.inv_make} ${selectedVehicle.inv_model}`,
            vehicles, // All vehicles for thumbnails
            vehicle: selectedVehicle, // Vehicle to display
        });

    } catch (error) {
        console.error("❌ Error in getVehicleDetails:", error);
        res.status(500).render("error", { 
            title: "Server Error", 
            message: "An unexpected error occurred. Please try again later.", 
            details: error.message 
        });
    }
}

// ✅ Function to get vehicle image path with a fallback
function getVehicleImage(model) {
    if (!model) return "/images/vehicles/no-image.png"; // Fallback for missing model
    const imagePath = `/images/vehicles/${model.toLowerCase()}.png`;
    return fileExists(imagePath) ? imagePath : "/images/vehicles/no-image.png";
}

// ✅ Function to get vehicle thumbnail path with a fallback
function getVehicleThumbnail(model) {
    if (!model) return "/images/vehicles/no-image-tn.png"; // Fallback for missing model
    const thumbnailPath = `/images/vehicles/${model.toLowerCase()}-tn.png`;
    return fileExists(thumbnailPath) ? thumbnailPath : "/images/vehicles/no-image-tn.png";
}

// ✅ Helper function to check if a file exists
function fileExists(relativePath) {
    const absolutePath = path.join(__dirname, "../public", relativePath);
    return fs.existsSync(absolutePath);
}

module.exports = { getVehicleDetails };
