const db = require("../config/database");

// Function to get all vehicles
function getAllVehicles() {
    return db.readData();
}

// Function to get a single vehicle by ID
function getVehicleById(id) {
    const vehicles = db.readData();
    return vehicles.find(vehicle => vehicle.id == id);
}

module.exports = { getAllVehicles, getVehicleById };
