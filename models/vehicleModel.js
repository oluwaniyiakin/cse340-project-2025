const db = require("../config/database"); // Ensure this is the correct path to your DB config

/**
 * Get all vehicles from the database
 */
async function getAllVehicles() {
    try {
        const result = await db.query("SELECT * FROM vehicles");
        return result.rows;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
}

/**
 * Get a vehicle by ID
 * @param {number} vehicleId - The ID of the vehicle
 */
async function getVehicleById(vehicleId) {
    try {
        const result = await db.query("SELECT * FROM vehicles WHERE id = $1", [vehicleId]);
        return result.rows[0]; // Return a single vehicle
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
 */
async function addVehicle(make, model, year, price) {
    try {
        const result = await db.query(
            "INSERT INTO vehicles (make, model, year, price) VALUES ($1, $2, $3, $4) RETURNING *",
            [make, model, year, price]
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
 */
async function updateVehicle(vehicleId, make, model, year, price) {
    try {
        const result = await db.query(
            "UPDATE vehicles SET make = $1, model = $2, year = $3, price = $4 WHERE id = $5 RETURNING *",
            [make, model, year, price, vehicleId]
        );
        return result.rows[0];
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
        const result = await db.query("DELETE FROM vehicles WHERE id = $1 RETURNING *", [vehicleId]);
        return result.rows[0];
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
