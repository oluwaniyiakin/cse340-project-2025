const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function getVehicleDetail(req, res, next) {
    try {
        const inv_id = req.params.inv_id; // Ensure this matches your route parameter
        const vehicle = await inventoryModel.getVehicleById(inv_id);

        if (!vehicle) {
            return res.status(404).render("error", { message: "Vehicle not found" });
        }

        // Generate HTML for the vehicle details using the utility function
        const vehicleHTML = utilities.buildVehicleHTML(vehicle);

        res.render("inventory/detail", {
            title: `${vehicle.make} ${vehicle.model}`,
            vehicleHTML,
        });

    } catch (error) {
        console.error("Error fetching vehicle:", error);
        next(error); // Pass error to error-handling middleware
    }
}

module.exports = { getVehicleDetail };
