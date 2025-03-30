const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

/**
 * Controller to fetch and render the vehicle detail view.
 * It retrieves the vehicle by its inventory ID, formats price and mileage,
 * and passes all details to the view.
 */
async function getVehicleDetail(req, res, next) {
  try {
    // Get the inventory ID from the URL parameters
    const inv_id = req.params.inv_id;
    
    // Fetch the vehicle from the database
    const vehicle = await inventoryModel.getVehicleById(inv_id);
    
    // If no vehicle is found, render a 404 error view
    if (!vehicle) {
      return res.status(404).render("errors/404", {
        title: "Vehicle Not Found",
        message: "Sorry, the vehicle you requested was not found."
      });
    }
    
    // Format price and mileage using utility functions
    const formattedPrice = utilities.formatPrice(vehicle.inv_price);
    const formattedMileage = utilities.formatMileage(vehicle.inv_miles);
    
    // Construct dynamic title from vehicle data
    const pageTitle = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`;
    
    // Render the vehicle detail view with all necessary data.
    // Ensure your view (views/inventory/detail.ejs) displays:
    // - Full-size image (vehicle.inv_image)
    // - Vehicle details (make, model, year, price, mileage, description, etc.)
    // - Additional vehicle specifications (lease info, fuel efficiency, exterior/interior color, etc.)
    res.render("inventory/detail", {
      title: pageTitle,
      vehicle,            // All vehicle data from the database
      formattedPrice,     // Price formatted as U.S. dollars
      formattedMileage    // Mileage formatted with commas
      // You can add more properties here if your view requires them (e.g., vehicle.inv_lease_info)
    });
  } catch (err) {
    // Pass any error to the error-handling middleware
    next(err);
  }
}

module.exports = { getVehicleDetail };
