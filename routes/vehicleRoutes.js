const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController"); // ✅ Correct controller import

// Route to get all vehicles
router.get("/", vehicleController.getAllVehicles);

// Route to get a specific vehicle by ID
router.get("/:id", vehicleController.getVehicleById);

module.exports = router; // ✅ Properly exporting router
