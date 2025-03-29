const fs = require('fs');
const path = require('path');

const vehiclesFilePath = path.join(__dirname, '../data/vehicles.json');

const getAllVehicles = () => {
    const data = fs.readFileSync(vehiclesFilePath, 'utf-8');
    return JSON.parse(data);
};

const getVehicleById = (id) => {
    const vehicles = getAllVehicles();
    return vehicles.find(vehicle => vehicle.id === parseInt(id));
};

module.exports = { getAllVehicles, getVehicleById };
