const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController"); // Ensure correct path

// Example route
router.get("/", vehicleController.getAllVehicles); // Ensure this function exists

module.exports = router;
