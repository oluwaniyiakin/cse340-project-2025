const fs = require("fs");
const path = require("path");

const vehiclesFilePath = path.join(__dirname, "../data/vehicles.json");

function getAllVehicles() {
    try {
        const data = fs.readFileSync(vehiclesFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ Error reading vehicles JSON:", error);
        return [];
    }
}

function getVehicleById(id) {
    const vehicles = getAllVehicles();
    return vehicles.find(vehicle => vehicle.inv_id == id);
}

module.exports = { getAllVehicles, getVehicleById };
