const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Route to handle vehicle detail view by inventory ID.
router.get("/detail/:inv_id", inventoryController.getVehicleDetail);

module.exports = router;
