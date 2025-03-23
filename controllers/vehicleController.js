const vehicleModel = require("../models/vehicleModel");

function vehicleList(req, res) {
    const vehicles = vehicleModel.getAllVehicles();
    res.render("vehicle-list", { vehicles });
}

function vehicleDetail(req, res) {
    const vehicleId = req.params.id;
    const vehicle = vehicleModel.getVehicleById(vehicleId);

    if (!vehicle) {
        return res.status(404).send("Vehicle not found");
    }

    res.render("vehicle-detail", { vehicle });
}

module.exports = { vehicleList, vehicleDetail };
