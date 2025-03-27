const vehicleModel = require('../models/vehicleModel');
const utilities = require('../utilities/index');

const showVehicleDetail = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await vehicleModel.getVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).render('error/404', { title: 'Vehicle Not Found' });
    }

    res.render('vehicle-detail', {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      vehicle,
      formattedPrice: utilities.formatPrice(vehicle.price),
      formattedMileage: utilities.formatMileage(vehicle.mileage),
    });
  } catch (error) {
    console.error('Error displaying vehicle:', error);
    res.status(500).render('error/500', { title: 'Server Error' });
  }
};

module.exports = { showVehicleDetail };
