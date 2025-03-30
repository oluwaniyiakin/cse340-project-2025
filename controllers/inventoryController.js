const utilities = require("../utilities");
const inventoryModel = require("../models/inventoryModel");

/* ****************************************
 *  Render Inventory Management View
 * **************************************** */
async function renderInventory(req, res, next) {
    try {
        let nav = await utilities.getNav();
        let inventoryList = await inventoryModel.getAllInventory();

        res.render("inventory/manage", {
            title: "Manage Inventory",
            nav,
            inventoryList,
            message: req.flash("message"),
            error: req.flash("error"),
        });
    } catch (error) {
        console.error("Error rendering inventory:", error);
        next(error);
    }
}

/* ****************************************
 *  Render Add Classification View
 * **************************************** */
async function renderAddClassification(req, res, next) {
    try {
        let nav = await utilities.getNav();

        res.render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            message: req.flash("message"),
            error: req.flash("error"),
        });
    } catch (error) {
        console.error("Error rendering classification view:", error);
        next(error);
    }
}

/* ****************************************
 *  Render Add Inventory Item View
 * **************************************** */
async function renderAddInventory(req, res, next) {
    try {
        let nav = await utilities.getNav();
        let classificationList = await inventoryModel.getClassifications();

        res.render("inventory/add-inventory", {
            title: "Add Inventory Item",
            nav,
            classificationList,
            message: req.flash("message"),
            error: req.flash("error"),
        });
    } catch (error) {
        console.error("Error rendering add inventory view:", error);
        next(error);
    }
}

/* ****************************************
 *  Process New Classification Submission
 * **************************************** */
async function addClassification(req, res, next) {
    try {
        const { classification_name } = req.body;

        if (!classification_name || /\s|\W/.test(classification_name)) {
            req.flash("error", "Invalid classification name: No spaces or special characters allowed.");
            return res.redirect("/inv/add-classification");
        }

        const insertResult = await inventoryModel.addClassification(classification_name);

        if (insertResult) {
            req.flash("message", "Classification added successfully!");
            res.redirect("/inv/");
        } else {
            req.flash("error", "Failed to add classification.");
            res.redirect("/inv/add-classification");
        }
    } catch (error) {
        console.error("Error adding classification:", error);
        req.flash("error", "Failed to add classification.");
        next(error);
    }
}

/* ****************************************
 *  Process New Inventory Item Submission
 * **************************************** */
async function addInventoryItem(req, res, next) {
    try {
        const { classification_id, inv_make, inv_model, inv_description, inv_price, inv_stock } = req.body;

        if (!classification_id || !inv_make || !inv_model || !inv_description || !inv_price || !inv_stock) {
            req.flash("error", "All fields are required.");
            return res.redirect("/inv/add-inventory");
        }

        const insertResult = await inventoryModel.addInventoryItem({
            classification_id,
            inv_make,
            inv_model,
            inv_description,
            inv_price,
            inv_stock,
        });

        if (insertResult) {
            req.flash("message", "Inventory item added successfully!");
            res.redirect("/inv/");
        } else {
            req.flash("error", "Failed to add inventory item.");
            res.redirect("/inv/add-inventory");
        }
    } catch (error) {
        console.error("Error adding inventory item:", error);
        req.flash("error", "Failed to add inventory item.");
        next(error);
    }
}

/* ****************************************
 *  Render Inventory Details View
 * **************************************** */
async function renderInventoryDetails(req, res, next) {
    try {
        let nav = await utilities.getNav();
        let inventory_id = req.params.inventory_id;
        let itemDetails = await inventoryModel.getVehicleById(inventory_id);

        if (!itemDetails) {
            req.flash("error", "Inventory item not found.");
            return res.redirect("/inv/");
        }

        res.render("inventory/details", {
            title: `${itemDetails.inv_make} ${itemDetails.inv_model}`,
            nav,
            itemDetails,
            message: req.flash("message"),
            error: req.flash("error"),
        });
    } catch (error) {
        console.error("Error fetching inventory details:", error);
        next(error);
    }
}

/* ****************************************
 *  Export Controller Functions
 * **************************************** */
module.exports = {
    renderInventory,
    renderAddClassification,
    renderAddInventory,
    addClassification,
    addInventoryItem,
    renderInventoryDetails,
};
