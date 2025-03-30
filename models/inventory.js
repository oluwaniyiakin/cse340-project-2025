const db = require('../database');

async function getVehicleById(vehicleId) {
    const query = `SELECT inv_make, inv_model, inv_year, 
                          COALESCE(inv_image, 'no-image.jpg') AS inv_image, 
                          inv_price, inv_miles, fuel_type, 
                          transmission, drivetrain, ext_color, 
                          int_color, stock_number, vin 
                   FROM inventory WHERE inv_id = $1`;
    const result = await db.query(query, [vehicleId]);
    return result.rows[0];
}
