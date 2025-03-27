const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.get('/vehicles/:id', vehicleController.showVehicleDetail);

module.exports = router;
