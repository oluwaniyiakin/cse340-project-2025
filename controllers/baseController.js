const vehicleModel = require("../models/vehicleModel"); // Import the model
const utilities = require("../utilities");

async function buildHome(req, res, next) {
    try {
        // Set a test flash message
        req.flash("notice", "Welcome to CSE Motors!");

        // Fetch navigation
        const nav = await utilities.getNav();

        // Fetch vehicles from the database
        const vehicles = await vehicleModel.getAllVehicles();

        // Render the home page with flash message, navigation, and vehicles
        res.render("index", { 
            title: "Home", 
            nav, 
            vehicles,
            notice: req.flash("notice") // Pass flash messages to view
        });
    } catch (error) {
        console.error("Error loading home page:", error);
        next(error); // Pass the error to the middleware
    }
}

module.exports = { buildHome };
