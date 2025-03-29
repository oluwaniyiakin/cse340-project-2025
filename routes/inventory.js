const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const vehiclesFilePath = path.join(__dirname, "../data/vehicles.json");

function getVehicles() {
    const data = fs.readFileSync(vehiclesFilePath);
    return JSON.parse(data);
}

// Get vehicle details by ID
router.get("/:id", (req, res) => {
    const vehicles = getVehicles();
    const vehicle = vehicles.find(v => v.inv_id == req.params.id);

    if (!vehicle) {
        return res.status(404).send("Vehicle not found");
    }

    res.render("inventory/vehicledetail", { vehicle });
});

module.exports = router;
