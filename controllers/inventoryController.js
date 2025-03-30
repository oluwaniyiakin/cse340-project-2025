const utilities = require("../utilities/");
const inventoryModel = require("../models/inventoryModel");

/* ****************************************
 *  Render Inventory Management View
 * *************************************** */
async function renderInventory(req, res, next) {
    try {
        let nav = await utilities.getNav();
        let inventoryList = await inventoryModel.getAllInventory();

        res.render("inventory/manage", {
            title: "Manage Inventory",
            nav,
            inventoryList,
        });
    } catch (error) {
        console.error("Error rendering inventory:", error);
        next(error); // Pass error to middleware
    }
}

/* ****************************************
 *  Render Add Classification View
 * *************************************** */
async function renderAddClassification(req, res, next) {
    try {
        let nav = await utilities.getNav();

        res.render("inventory/add-classification", {
            title: "Add Classification",
            nav,
        });
    } catch (error) {
        console.error("Error rendering classification view:", error);
        next(error);
    }
}

/* ****************************************
 *  Render Add Inventory Item View
 * *************************************** */
async function renderAddInventory(req, res, next) {
    try {
        let nav = await utilities.getNav();
        let classifications = await inventoryModel.getClassifications();

        res.render("inventory/add-inventory", {
            title: "Add Inventory Item",
            nav,
            classifications,
        });
    } catch (error) {
        console.error("Error rendering add inventory view:", error);
        next(error);
    }
}

/* ****************************************
 *  Process New Classification Submission
 * *************************************** */
async function addClassification(req, res, next) {
    try {
        const { classification_name } = req.body;
        
        if (!classification_name) {
            req.flash("error", "Classification name is required.");
            return res.redirect("/inventory/add-classification");
        }

        await inventoryModel.insertClassification(classification_name);

        req.flash("success", "Classification added successfully!");
        res.redirect("/inventory/manage");
    } catch (error) {
        console.error("Error adding classification:", error);
        req.flash("error", "Failed to add classification.");
        next(error);
    }
}

/* ****************************************
 *  Process New Inventory Item Submission
 * *************************************** */
async function addInventoryItem(req, res, next) {
    try {
        const { item_name, classification_id, quantity, price } = req.body;
        
        if (!item_name || !classification_id || !quantity || !price) {
            req.flash("error", "All fields are required.");
            return res.redirect("/inventory/add-inventory");
        }

        await inventoryModel.insertInventoryItem({
            item_name,
            classification_id,
            quantity,
            price,
        });

        req.flash("success", "Inventory item added successfully!");
        res.redirect("/inventory/manage");
    } catch (error) {
        console.error("Error adding inventory item:", error);
        req.flash("error", "Failed to add inventory item.");
        next(error);
    }
}

/* ****************************************
 *  Render Inventory Details View
 * *************************************** */
async function renderInventoryDetails(req, res, next) {
    try {
        let nav = await utilities.getNav();
        let itemId = req.params.id;
        let itemDetails = await inventoryModel.getInventoryById(itemId);

        if (!itemDetails) {
            req.flash("error", "Inventory item not found.");
            return res.redirect("/inventory/manage");
        }

        res.render("inventory/details", {
            title: itemDetails.item_name,
            nav,
            itemDetails,
        });
    } catch (error) {
        console.error("Error fetching inventory details:", error);
        next(error);
    }
}

/* ****************************************
 *  Export Controller Functions
 * *************************************** */
module.exports = {
    renderInventory,
    renderAddClassification,
    renderAddInventory,
    addClassification,
    addInventoryItem,
    renderInventoryDetails,
};
