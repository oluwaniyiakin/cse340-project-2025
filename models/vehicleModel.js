const vehicles = require("../data/vehicles.json");

// ✅ Function to get all vehicles
exports.getAllVehicles = () => {
    return vehicles;
};

// ✅ Function to get a single vehicle by ID
exports.getVehicleById = (id) => {
    return vehicles.find(vehicle => vehicle.id.toString() === id);
};
