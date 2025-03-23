const vehicles = require("../data/vehicles.json"); // ✅ Load vehicle data

// Show all vehicles
exports.getAllVehicles = (req, res) => {
    res.render("vehicle-list", { vehicles }); // ✅ Render vehicle list page
};

// Show a specific vehicle by ID
exports.getVehicleById = (req, res) => {
    const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) {
        return res.status(404).send("Vehicle not found");
    }
    res.render("vehicle-detail", { vehicle }); // ✅ Render vehicle detail page
};
