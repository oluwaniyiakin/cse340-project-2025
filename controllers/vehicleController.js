const path = require("path");
const fs = require("fs");

// Load vehicle data from JSON file
const vehiclesPath = path.join(__dirname, "../data/vehicles.json");

let vehicles = [];
try {
    const data = fs.readFileSync(vehiclesPath, "utf-8");
    vehicles = JSON.parse(data);
} catch (error) {
    console.error("Error loading vehicle data:", error);
}

// Controller: Display all vehicles
exports.getAllVehicles = (req, res) => {
    res.render("vehicle-list", { vehicles });
};

// Controller: Display details of a specific vehicle
exports.getVehicleById = (req, res) => {
    const vehicleId = parseInt(req.params.id, 10);
    const vehicle = vehicles.find(v => v.id === vehicleId);

    if (!vehicle) {
        return res.status(404).render("404", { message: "Vehicle not found" });
    }

    res.render("vehicle-detail", { vehicle });
};
