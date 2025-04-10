const express = require("express");
const router = new express.Router();
const { check, validationResult } = require("express-validator");
const utilities = require("../utilities/");
const inventoryController = require("../controllers/inventoryController");

// Route to build inventory management view
router.get("/", inventoryController.buildManagement);

// Route to build inventory by classification view
router.get("/type/:classificationId", inventoryController.buildByClassificationId);

// Vehicle Detail Route
router.get("/detail/:id", utilities.handleErrors(inventoryController.buildDetail));

// Broken route (for testing error handling)
router.get("/broken", utilities.handleErrors(inventoryController.throwError));

// Route to build add classification view
router.get("/add-classification", inventoryController.buildAddClassification);

// Route to handle adding a new classification with validation
router.post("/add-classification",
  check("classification_name", "No special characters or spaces allowed")
    .matches(/^[a-zA-Z0-9]+$/)
    .isLength({ min: 1 }),
  inventoryController.addClassification
);

// Route to build add inventory view
router.get("/add-inventory", inventoryController.buildAddInventory);

// Route to handle add inventory form submission
router.post("/add-inventory",
  // Add input validation rules here (e.g., for vehicle make, model, etc.)
  check("inv_make", "Make must not be empty").notEmpty(),
  check("inv_model", "Model must not be empty").notEmpty(),
  check("inv_year", "Year must be a valid number").isNumeric(),
  check("inv_price", "Price must be a valid number").isNumeric(),
  check("inv_miles", "Miles must be a valid number").isNumeric(),
  inventoryController.addInventory
);

module.exports = router;
