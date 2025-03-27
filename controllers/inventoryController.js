const inventoryModel = require("../models/inventoryModel");

// Controller to get vehicle details
exports.getVehicleDetail = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await inventoryModel.getVehicleById(vehicleId);
    
    if (!vehicle) {
      return res.status(404).render("error", { message: "Vehicle not found" });
    }

    // Format price and mileage
    vehicle.price = formatPrice(vehicle.price);
    vehicle.mileage = formatMileage(vehicle.mileage);

    res.render("vehicle-detail", {
      vehicle: vehicle,
      formatPrice: formatPrice,
      formatMileage: formatMileage
    });
  } catch (err) {
    next(err);
  }
};

// Utility function to format price
function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

// Utility function to format mileage
function formatMileage(mileage) {
  return mileage.toLocaleString();
}
