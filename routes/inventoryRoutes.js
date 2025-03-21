const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Route for vehicle detail view
router.get("/detail/:inv_id", inventoryController.getVehicleDetail);

module.exports = router;
