const vehicleModel = require("../models/vehicleModel");

// Controller to render all vehicles
exports.getAllVehicles = (req, res) => {
    const vehicles = vehicleModel.getAllVehicles();
    res.render("vehicles", { vehicles });
};

// Controller to render details of a single vehicle
exports.getVehicleById = (req, res) => {
    const vehicle = vehicleModel.getVehicleById(req.params.id);
    if (!vehicle) {
        return res.status(404).send("Vehicle not found");
    }
    const allVehicles = vehicleModel.getAllVehicles();
    res.render("vehicle-details", { vehicle, allVehicles });
};
