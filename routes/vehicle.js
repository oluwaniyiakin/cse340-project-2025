const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Route to get all vehicles
router.get('/', vehicleController.showAllVehicles);

// Route to get a single vehicle by ID
router.get('/:id', vehicleController.showVehicleDetail);

module.exports = router;
