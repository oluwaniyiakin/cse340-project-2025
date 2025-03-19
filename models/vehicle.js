const pool = require("./db");

async function getVehicleById(vehicleId) {
    try {
        const query = `
            SELECT 
                id, year, make, model, price, mileage, mpg, color, 
                transmission, drivetrain, vin, image, thumbnails 
            FROM vehicles 
            WHERE id = $1
        `;
        const { rows } = await pool.query(query, [vehicleId]);
        return rows[0]; // Return the first matching row
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}

module.exports = { getVehicleById };
