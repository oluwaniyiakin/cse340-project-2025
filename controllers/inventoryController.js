const { validationResult } = require("express-validator");
const utilities = require("../utilities/");
const invModel = require("../models/inventoryModel");

const inventoryController = {};

/* ***************************
 *  Build Inventory Management View
 * ************************** */
inventoryController.buildManagement = async function (req, res, next) {
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

/* ***************************
 *  Build Add Inventory Form
 * ************************** */
inventoryController.buildAddInventory = async (req, res) => {
  try {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      classificationList,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

/* ***************************
 *  Add Inventory to Database
 * ************************** */
inventoryController.addInventory = async (req, res, next) => {
  try {
    const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body;
    const errors = validationResult(req);

    // If validation errors are found, render the form again with error messages
    if (!errors.isEmpty()) {
      return res.status(400).render("inventory/add-inventory", {
        title: "Add Vehicle",
        nav: await utilities.getNav(),
        classificationList: await utilities.buildClassificationList(classification_id),
        errors: errors.array(),
        ...req.body,
      });
    }

    // Add inventory item to the database
    const result = await invModel.addInventory(req.body);
    if (result) {
      req.flash("notice", "Vehicle successfully added.");
      res.redirect("/inv");
    } else {
      req.flash("notice", "Failed to add vehicle.");
      res.status(500).render("inventory/add-inventory", {
        title: "Add Vehicle",
        nav: await utilities.getNav(),
        classificationList: await utilities.buildClassificationList(classification_id),
        errors: null,
        ...req.body,
      });
    }
  } catch (error) {
    next(error);
  }
};

/* ***************************
 *  Build Inventory by Classification View
 * ************************** */
inventoryController.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
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

/* ***************************
 *  Build Vehicle Detail View
 * ************************** */
inventoryController.buildDetail = async function (req, res, next) {
  try {
    const invId = req.params.id;
    const vehicle = await invModel.getInventoryById(invId);
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

/* ***************************
 *  Throw an Intentional Error (For Testing)
 * ************************** */
inventoryController.throwError = async function (req, res, next) {
  try {
    throw new Error("I am an intentional error");
  } catch (err) {
    next(err);
  }
};

/* ***************************
 *  Build Add Classification Form
 * ************************** */
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

/* ***************************
 *  Add Classification
 * ************************** */
inventoryController.addClassification = async (req, res) => {
  try {
    const nav = await utilities.getNav();
    const { classification_name } = req.body;
    const errors = validationResult(req);

    // If validation errors are found, render the form again with error messages
    if (!errors.isEmpty()) {
      return res.status(400).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: errors.array(),
      });
    }

    // Add classification to the database
    const result = await invModel.addClassification(classification_name);

    if (result) {
      req.flash("notice", `${classification_name} successfully added.`);
      res.redirect("/inv");
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
