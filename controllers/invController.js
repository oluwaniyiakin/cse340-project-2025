const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function getVehicleDetail(req, res, next) {
    try {
        const inv_id = req.params.inv_id; // Ensure this matches your route parameter
        const vehicle = await inventoryModel.getVehicleById(inv_id);

        if (!vehicle) {
            return res.status(404).render("error", { 
                title: "Vehicle Not Found", 
                message: "Sorry, the vehicle you're looking for does not exist." 
            });
        }

        // Format price as US dollars
        vehicle.price = new Intl.NumberFormat("en-US", { 
            style: "currency", 
            currency: "USD" 
        }).format(vehicle.price);

        // Format mileage with commas
        vehicle.mileage = new Intl.NumberFormat("en-US").format(vehicle.mileage);

        res.render("inventory/vehicle-detail", {
            title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
            vehicle,
        });

    } catch (error) {
        console.error("Error fetching vehicle:", error);
        next(error); // Pass error to error-handling middleware
    }
}

module.exports = { getVehicleDetail };
