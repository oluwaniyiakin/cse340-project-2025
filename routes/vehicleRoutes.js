const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

// Route to display all vehicles
router.get("/", vehicleController.vehicleList);

// Route to display vehicle details
router.get("/:id", vehicleController.vehicleDetail);

module.exports = router;
