const Inventory = require('../models/inventory');

exports.getVehicleDetails = async (req, res) => {
    try {
        const { inv_id } = req.params;
        const vehicle = await Inventory.getById(inv_id);

        if (!vehicle) {
            return res.status(404).render('error', { message: 'Vehicle not found' });
        }

        res.render('inventory/detail', { vehicle });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
