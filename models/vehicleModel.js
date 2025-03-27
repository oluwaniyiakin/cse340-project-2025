const pool = require("../config/database"); // Ensure correct database connection

/**
 * Get all vehicles from the database
 */
async function getAllVehicles() {
    try {
        const result = await pool.query("SELECT * FROM vehicles LIMIT 10"); // Use `pool.query`
        return result.rows;
    } catch (err) {
        console.error("Error fetching vehicles:", err);
        throw err;
    }
}

/**
 * Get a vehicle by ID
 * @param {number} vehicleId - The ID of the vehicle
 */
async function getVehicleById(vehicleId) {
    try {
        const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [vehicleId]);
        return result.rows[0] || null; // Return a single vehicle or null
    } catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        throw error;
    }
}

/**
 * Add a new vehicle to the database
 * @param {string} make - The make of the vehicle
 * @param {string} model - The model of the vehicle
 * @param {number} year - The year of the vehicle
 * @param {number} price - The price of the vehicle
 * @param {number} mileage - The mileage of the vehicle
 * @param {string} image_url - Image URL of the vehicle
 */
async function addVehicle(make, model, year, price, mileage, image_url) {
    try {
        const result = await pool.query(
            "INSERT INTO vehicles (make, model, year, price, mileage, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [make, model, year, price, mileage, image_url]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error adding vehicle:", error);
        throw error;
    }
}

/**
 * Update a vehicle by ID
 * @param {number} vehicleId - The ID of the vehicle to update
 * @param {string} make - The new make of the vehicle
 * @param {string} model - The new model of the vehicle
 * @param {number} year - The new year of the vehicle
 * @param {number} price - The new price of the vehicle
 * @param {number} mileage - The updated mileage
 * @param {string} image_url - Updated image URL
 */
async function updateVehicle(vehicleId, make, model, year, price, mileage, image_url) {
    try {
        const result = await pool.query(
            "UPDATE vehicles SET make = $1, model = $2, year = $3, price = $4, mileage = $5, image_url = $6 WHERE id = $7 RETURNING *",
            [make, model, year, price, mileage, image_url, vehicleId]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error updating vehicle:", error);
        throw error;
    }
}

/**
 * Delete a vehicle by ID
 * @param {number} vehicleId - The ID of the vehicle to delete
 */
async function deleteVehicle(vehicleId) {
    try {
        const result = await pool.query("DELETE FROM vehicles WHERE id = $1 RETURNING *", [vehicleId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error deleting vehicle:", error);
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
