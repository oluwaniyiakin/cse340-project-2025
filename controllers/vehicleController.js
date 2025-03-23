const vehicleModel = require("../models/vehicleModel");

// ✅ Function to get all vehicles
exports.getAllVehicles = (req, res) => {
    const vehicles = vehicleModel.getAllVehicles();
    res.render("vehicles", { vehicles });
};

// ✅ Function to get a specific vehicle by ID
exports.getVehicleById = (req, res) => {
    const vehicle = vehicleModel.getVehicleById(req.params.id);
    if (!vehicle) {
        return res.status(404).send("Vehicle not found");
    }
    const allVehicles = vehicleModel.getAllVehicles();
    res.render("vehicle-details", { vehicle, allVehicles });
};
