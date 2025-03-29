const fs = require('fs');
const path = require('path');

const vehiclesFilePath = path.join(__dirname, '../data/vehicles.json');

const getHomePage = (req, res) => {
    const vehicles = JSON.parse(fs.readFileSync(vehiclesFilePath, 'utf-8'));
    
    res.render('home', { vehicles });
};

module.exports = { getHomePage };
