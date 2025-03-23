const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

// Route to display the vehicle home page (all vehicles)
router.get("/", vehicleController.getAllVehicles);

// Route to display a specific vehicle's details
router.get("/:id", vehicleController.getVehicleById);

module.exports = router;
