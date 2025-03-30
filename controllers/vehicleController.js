const vehicleModel = require("../models/vehicleModel");
const utilities = require("../utilities/index");

/* ****************************************
 *  Get all vehicles and render inventory page
 * **************************************** */
async function getAllVehicles(req, res, next) {
    try {
        const vehicles = await vehicleModel.getAllVehicles();
        const nav = await utilities.getNav();
        
        res.render("inventory/vehicle-list", {
            title: "Vehicle Inventory",
            nav,
            vehicles
        });
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        next(error);
    }
}

/* ****************************************
 *  Get vehicle details by ID
 * **************************************** */
async function getVehicleById(req, res, next) {
    try {
        const vehicleId = req.params.id;
        const vehicle = await vehicleModel.getVehicleById(vehicleId);
        const nav = await utilities.getNav();

        if (!vehicle) {
            return res.status(404).send("Vehicle not found");
        }

        res.render("inventory/vehicle-detail", {
            title: vehicle.make + " " + vehicle.model,
            nav,
            vehicle
        });
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        next(error);
    }
}

/* ****************************************
 *  Create a new vehicle entry
 * **************************************** */
async function createVehicle(req, res, next) {
    try {
        const { make, model, year, price, mileage, description } = req.body;
        
        if (!make || !model || !year || !price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newVehicle = await vehicleModel.createVehicle({
            make, model, year, price, mileage, description
        });

        res.status(201).json({ message: "Vehicle created successfully", vehicle: newVehicle });
    } catch (error) {
        console.error("Error creating vehicle:", error);
        next(error);
    }
}

/* ****************************************
 *  Update an existing vehicle
 * **************************************** */
async function updateVehicle(req, res, next) {
    try {
        const vehicleId = req.params.id;
        const updatedData = req.body;

        const updatedVehicle = await vehicleModel.updateVehicle(vehicleId, updatedData);

        if (!updatedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.json({ message: "Vehicle updated successfully", vehicle: updatedVehicle });
    } catch (error) {
        console.error("Error updating vehicle:", error);
        next(error);
    }
}

/* ****************************************
 *  Delete a vehicle
 * **************************************** */
async function deleteVehicle(req, res, next) {
    try {
        const vehicleId = req.params.id;
        const result = await vehicleModel.deleteVehicle(vehicleId);

        if (!result) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        next(error);
    }
}

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
