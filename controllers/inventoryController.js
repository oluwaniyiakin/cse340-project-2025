const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function getVehicleDetail(req, res, next) {
    try {
        const inv_id = req.params.inv_id;
        const vehicle = await inventoryModel.getVehicleById(inv_id);

        if (!vehicle) {
            return res.status(404).render("error", { message: "Vehicle not found" });
        }

        const vehicleHTML = utilities.buildVehicleHTML(vehicle);
        
        res.render("inventory/detail", {
            title: `${vehicle.make} ${vehicle.model}`,
            vehicleHTML,
        });

    } catch (error) {
        next(error); // Pass error to middleware
    }
}

module.exports = { getVehicleDetail };
