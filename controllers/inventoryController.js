const { validationResult } = require("express-validator");
const utilities = require("../utilities");
const inventoryModel = require("../models/inventoryModel");

const inventoryController = {};

/* ============================
 * Inventory Management View
 * ============================ */
inventoryController.buildManagement = async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      notice: req.flash("notice"),
      errors: null,
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
 * Add Inventory Form View
 * ============================ */
inventoryController.buildAddInventory = async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      classificationList,
      errors: null,
      stickyData: {},
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
 * Add Inventory to Database
 * ============================ */
inventoryController.addInventory = async (req, res, next) => {
  try {
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    } = req.body;

    const errors = validationResult(req);
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList(classification_id);

    if (!errors.isEmpty()) {
      return res.status(400).render("inventory/add-inventory", {
        title: "Add Vehicle",
        nav,
        classificationList,
        errors: errors.array(),
        stickyData: req.body,
      });
    }

    const result = await inventoryModel.addInventory(req.body);
    if (result) {
      req.flash("notice", "Vehicle successfully added.");
      return res.redirect("/inv");
    } else {
      req.flash("notice", "Failed to add vehicle.");
      res.status(500).render("inventory/add-inventory", {
        title: "Add Vehicle",
        nav,
        classificationList,
        errors: null,
        stickyData: req.body,
      });
    }
  } catch (err) {
    next(err);
  }
};

/* ============================
 * View Vehicles by Classification
 * ============================ */
inventoryController.buildByClassificationId = async (req, res, next) => {
  try {
    const classification_id = req.params.classificationId;
    const data = await inventoryModel.getInventoryByClassificationId(classification_id);

    if (!data || data.length === 0) {
      req.flash("notice", "No vehicles found for this classification.");
      return res.redirect("/inv");
    }

    const grid = await utilities.buildClassificationGrid(data);
    const nav = await utilities.getNav();
    const className = data[0].classification_name;

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
 * Vehicle Detail View
 * ============================ */
inventoryController.buildDetail = async (req, res, next) => {
  try {
    const invId = req.params.id;
    const vehicle = await inventoryModel.getInventoryById(invId);

    if (!vehicle) {
      req.flash("notice", "Vehicle not found.");
      return res.redirect("/inv");
    }

    const htmlData = await utilities.buildSingleVehicleDisplay(vehicle);
    const nav = await utilities.getNav();
    const vehicleTitle = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`;

    res.render("inventory/detail", {
      title: vehicleTitle,
      nav,
      message: null,
      htmlData,
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
 * Intentional Error (Testing)
 * ============================ */
inventoryController.throwError = async (req, res, next) => {
  try {
    throw new Error("This is an intentional error for testing.");
  } catch (err) {
    next(err);
  }
};

/* ============================
 * Add Classification Form View
 * ============================ */
inventoryController.buildAddClassification = async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    });
  } catch (err) {
    next(err);
  }
};

/* ============================
 * Add Classification to Database
 * ============================ */
inventoryController.addClassification = async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    const { classification_name } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: errors.array(),
      });
    }

    const result = await inventoryModel.addClassification(classification_name);
    if (result) {
      req.flash("notice", `${classification_name} successfully added.`);
      return res.redirect("/inv");
    } else {
      req.flash("notice", "Failed to add classification.");
      res.status(500).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = inventoryController;
