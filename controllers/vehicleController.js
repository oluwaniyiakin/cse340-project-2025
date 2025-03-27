const vehicleModel = require('../models/vehicleModel');
const utilities = require('../utilities/index');

const showVehicleDetail = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await vehicleModel.getVehicleById(vehicleId);

    if (!vehicle) {
      console.warn(`Vehicle with ID ${vehicleId} not found.`);
      return res.status(404).render('error/404', { title: 'Vehicle Not Found' });
    }

    res.render('vehicle-detail', {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle,
      formattedPrice: utilities.formatPrice(vehicle.inv_price),
      formattedMileage: utilities.formatMileage(vehicle.inv_miles),
    });
  } catch (error) {
    console.error(`Error fetching vehicle details for ID ${req.params.id}:`, error);
    res.status(500).render('error/500', { title: 'Server Error' });
  }
};

module.exports = { showVehicleDetail };
