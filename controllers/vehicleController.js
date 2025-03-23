const vehicles = require("../data/vehicles.json"); // ✅ Load vehicle data

// Get all vehicles
exports.getAllVehicles = (req, res) => {
    res.json(vehicles);
};

// Get vehicle by ID
exports.getVehicleById = (req, res) => {
    const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(vehicle);
};
