const express = require("express");
const router = express.Router();
const baseController = require("../controllers/baseController");

router.get("/", baseController.buildHome);
// Home route: Render the homepage (index.ejs)
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Include static routes
const staticRoutes = require("./static");
router.use(staticRoutes);

// Include inventory routes under "/inventory"
const inventoryRoutes = require("./inventory");
router.use("/inventory", inventoryRoutes);

// Include error routes under "/error"
const errorRoutes = require("./error");
router.use("/error", errorRoutes);

module.exports = router;
