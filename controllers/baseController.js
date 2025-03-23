const vehicleModel = require("../models/vehicleModel"); // Import the model

async function buildHome(req, res) {
    try {
        const vehicles = await vehicleModel.getAllVehicles(); // Fetch vehicles from DB
        res.render("index", { vehicles }); // Pass vehicles to index.ejs
    } catch (error) {
        console.error("Error loading vehicles:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { buildHome };
