/******************************************
 * Main Routes File for CSE Motors App
 * Handles Routing for Home, Inventory, and Static Pages
 ******************************************/

const express = require("express");
const router = express.Router();
const baseController = require("../controllers/baseController"); // Base controller

// Home Route
router.get("/", baseController.buildHome);

router.get("/trigger-error", (req, res, next) => {
    throw new Error("This is a test error");
});


module.exports = router;
