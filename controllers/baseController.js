const vehicleModel = require("../models/vehicleModel"); // Import vehicle model

/**
 * Render the home page with a list of vehicles
 */
async function buildHome(req, res) {
    try {
        const vehicles = await vehicleModel.getAllVehicles(); // Fetch vehicles from DB
        res.render("index", { vehicles }); // Pass data to EJS template
    } catch (error) {
        console.error("❌ Error loading vehicles:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { buildHome };
