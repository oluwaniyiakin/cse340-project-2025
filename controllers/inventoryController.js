const fs = require('fs');
const path = require('path');

const getVehicles = () => {
    const filePath = path.join(__dirname, '../data/vehicles.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
};

// Fetch a specific vehicle by ID
const getVehicleById = (id) => {
    const vehicles = getVehicles();
    return vehicles.find(vehicle => vehicle.inv_id == id);
};

// Controller to serve vehicle details
exports.vehicleDetail = (req, res) => {
    const vehicleId = req.params.id;
    const vehicle = getVehicleById(vehicleId);

    if (!vehicle) {
        return res.status(404).send('Vehicle not found');
    }

    res.render('inventory/vehicledetail', { vehicle, vehicles: getVehicles() });
};
