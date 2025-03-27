const pool = require("../config/database"); // Ensure correct database connection

/**
 * Get all vehicles from the database
 */
async function getAllVehicles() {
    try {
        const result = await pool.query("SELECT id, make, model, year FROM vehicles ORDER BY year DESC LIMIT 10");
        return result.rows;
    } catch (err) {
        console.error("❌ Error fetching vehicles:", err);
        throw err;
    }
}

/**
 * Get a vehicle by ID
 * @param {number} vehicleId - The ID of the vehicle
 */
async function getVehicleById(vehicleId) {
    try {
        const result = await pool.query("SELECT * FROM vehicles WHERE inv_id = $1", [vehicleId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error(`❌ Error fetching vehicle with ID ${vehicleId}:`, error);
        throw error;
    }
}

/**
 * Add a new vehicle to the database
 */
async function addVehicle(make, model, year, price, mileage, image_url) {
    try {
        const result = await pool.query(
            "INSERT INTO vehicles (inv_make, inv_model, inv_year, inv_price, inv_miles, inv_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [make, model, year, price, mileage, image_url]
        );
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error adding vehicle:", error);
        throw error;
    }
}

/**
 * Update a vehicle by ID
 */
async function updateVehicle(vehicleId, make, model, year, price, mileage, image_url) {
    try {
        const result = await pool.query(
            "UPDATE vehicles SET inv_make = $1, inv_model = $2, inv_year = $3, inv_price = $4, inv_miles = $5, inv_image = $6 WHERE inv_id = $7 RETURNING *",
            [make, model, year, price, mileage, image_url, vehicleId]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error(`❌ Error updating vehicle with ID ${vehicleId}:`, error);
        throw error;
    }
}

/**
 * Delete a vehicle by ID
 */
async function deleteVehicle(vehicleId) {
    try {
        const result = await pool.query("DELETE FROM vehicles WHERE inv_id = $1 RETURNING *", [vehicleId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error(`❌ Error deleting vehicle with ID ${vehicleId}:`, error);
        throw error;
    }
}

module.exports = {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle,
};
