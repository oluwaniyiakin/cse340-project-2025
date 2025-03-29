const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");
const fs = require("fs"); // For checking existing images

// Get vehicle details by inventory_id
async function getVehicleDetails(req, res) {
    try {
        console.log("🔍 Fetching vehicle details...");

        const inventoryId = req.params.inventory_id;
        if (!inventoryId) {
            console.error("❌ No inventory ID provided!");
            return res.status(400).render("error", { 
                title: "Invalid Request", 
                message: "No vehicle ID was provided. Please select a vehicle." 
            });
        }

        // Fetch vehicle details from the database
        const vehicle = await inventoryModel.getVehicleById(inventoryId);
        if (!vehicle) {
            console.error(`❌ Vehicle with ID ${inventoryId} not found!`);
            return res.status(404).render("error", { 
                title: "Vehicle Not Found", 
                message: "The requested vehicle does not exist in our inventory." 
            });
        }

        // ✅ Ensure images exist, fallback to "no-image.png" if missing
        vehicle.inv_image = getVehicleImage(vehicle.inv_model);
        vehicle.inv_thumbnail = getVehicleThumbnail(vehicle.inv_model);

        // ✅ Format price and mileage correctly
        vehicle.inv_price = utilities.formatCurrency(vehicle.inv_price);
        vehicle.inv_miles = utilities.formatNumber(vehicle.inv_miles);

        // ✅ Render the vehicle details view
        res.render("inventory/vehicledetail", {
            title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
            vehicle, // Vehicle to display
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
    return fs.existsSync(`public${imagePath}`) ? imagePath : "/images/vehicles/no-image.png";
}

// ✅ Function to get vehicle thumbnail path with a fallback
function getVehicleThumbnail(model) {
    if (!model) return "/images/vehicles/no-image-tn.png"; // Fallback for missing model
    const thumbnailPath = `/images/vehicles/${model.toLowerCase()}-tn.png`;
    return fs.existsSync(`public${thumbnailPath}`) ? thumbnailPath : "/images/vehicles/no-image-tn.png";
}

module.exports = { getVehicleDetails };
