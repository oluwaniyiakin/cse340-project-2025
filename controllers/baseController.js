const utilities = require("../utilities");
const classificationModel = require("../models/inventoryModel");

const baseController = {
  buildHome: async function (req, res) {
    try {
      const nav = await utilities.getNav();
      const classifications = await classificationModel.getClassifications(); // Fetch classifications

      res.render("index", { 
        title: "Home", 
        nav, 
        classifications // Pass classifications to the view
      });
    } catch (error) {
      console.error("Error building home page:", error);
      res.status(500).send("Internal Server Error");
    }
  }
};

module.exports = baseController;
