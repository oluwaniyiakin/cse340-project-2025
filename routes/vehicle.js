const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController'); // Make sure this path is correct

router.get('/:id', vehicleController.getVehicleById); // Ensure this function is properly exported

module.exports = router;
