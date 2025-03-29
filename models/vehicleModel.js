const pool = require("../config/database"); // Database connection

/**
 * Get all vehicles from the database.
 */
async function getAllVehicles() {
    try {
        const query = `
            SELECT inventory_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_image
            FROM inventory
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("❌ Error fetching all vehicles:", error.message);
        throw new Error("Database error while fetching all vehicles.");
    }
}

/**
 * Get a vehicle by ID.
 * @param {number} vehicleId - The ID of the vehicle
 */
async function getVehicleById(vehicleId) {
    try {
        const query = `
            SELECT inventory_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_image
            FROM inventory
            WHERE inventory_id = $1
        `;
        const result = await pool.query(query, [vehicleId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error(`❌ Error fetching vehicle with ID ${vehicleId}:`, error.message);
        throw new Error(`Database error while fetching vehicle with ID ${vehicleId}.`);
    }
}

/**
 * Add a new vehicle to the database.
 * @param {string} make - Vehicle make
 * @param {string} model - Vehicle model
 * @param {number} year - Year of manufacture
 * @param {number} price - Vehicle price
 * @param {number} miles - Vehicle mileage
 * @param {string} image - Image URL of the vehicle
 */
async function addVehicle(make, model, year, price, miles, image) {
    try {
        const query = `
            INSERT INTO inventory (inv_make, inv_model, inv_year, inv_price, inv_miles, inv_image)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [make, model, year, price, miles, image];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error adding vehicle:", error.message);
        throw new Error("Database error while adding a new vehicle.");
    }
}

/**
 * Update a vehicle by ID.
 * @param {number} vehicleId - ID of the vehicle to update
 * @param {string} make - Updated make
 * @param {string} model - Updated model
 * @param {number} year - Updated year
 * @param {number} price - Updated price
 * @param {number} miles - Updated mileage
 * @param {string} image - Updated image URL
 */
async function updateVehicle(vehicleId, make, model, year, price, miles, image) {
    try {
        const query = `
            UPDATE inventory
            SET inv_make = $1, inv_model = $2, inv_year = $3, inv_price = $4, inv_miles = $5, inv_image = $6
            WHERE inventory_id = $7
            RETURNING *;
        `;
        const values = [make, model, year, price, miles, image, vehicleId];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    } catch (error) {
        console.error(`❌ Error updating vehicle with ID ${vehicleId}:`, error.message);
        throw new Error(`Database error while updating vehicle with ID ${vehicleId}.`);
    }
}

/**
 * Delete a vehicle by ID.
 * @param {number} vehicleId - ID of the vehicle to delete
 */
async function deleteVehicle(vehicleId) {
    try {
        const query = `
            DELETE FROM inventory
            WHERE inventory_id = $1
            RETURNING *;
        `;
        const result = await pool.query(query, [vehicleId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error(`❌ Error deleting vehicle with ID ${vehicleId}:`, error.message);
        throw new Error(`Database error while deleting vehicle with ID ${vehicleId}.`);
    }
}

// ✅ Export all functions
module.exports = {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle,
};
