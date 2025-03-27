const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// ✅ Ensure the controller function exists
if (!inventoryController.getVehicleDetails) {
    throw new Error("getVehicleDetails function is missing in inventoryController");
}

// ✅ Define a route for getting vehicle details
router.get("/detail/:inventory_id?", inventoryController.getVehicleDetails);

module.exports = router;
