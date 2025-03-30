const express = require("express");
const router = express.Router();

// Import your static and inventory routes
const staticRoutes = require("./static");
const inventoryRoutes = require("./inventory");

router.use(staticRoutes);
router.use("/inventory", inventoryRoutes);

module.exports = router;
