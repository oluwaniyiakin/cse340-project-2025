const pool = require("../database"); // PostgreSQL connection pool

/* ****************************************
 *  Get all vehicles from the database
 * **************************************** */
async function getAllVehicles() {
    try {
        const result = await pool.query("SELECT * FROM vehicles ORDER BY make, model");
        return result.rows;
    } catch (error) {
        console.error("Database error - getAllVehicles:", error);
        throw error;
    }
}

/* ****************************************
 *  Get vehicle by ID
 * **************************************** */
async function getVehicleById(vehicleId) {
    try {
        const result = await pool.query("SELECT * FROM vehicles WHERE vehicle_id = $1", [vehicleId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Database error - getVehicleById:", error);
        throw error;
    }
}

/* ****************************************
 *  Create a new vehicle
 * **************************************** */
async function createVehicle({ make, model, year, price, mileage, description }) {
    try {
        const query = `
            INSERT INTO vehicles (make, model, year, price, mileage, description)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [make, model, year, price, mileage, description];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Database error - createVehicle:", error);
        throw error;
    }
}

/* ****************************************
 *  Update an existing vehicle
 * **************************************** */
async function updateVehicle(vehicleId, updatedData) {
    try {
        const { make, model, year, price, mileage, description } = updatedData;

        const query = `
            UPDATE vehicles 
            SET make = $1, model = $2, year = $3, price = $4, mileage = $5, description = $6
            WHERE vehicle_id = $7
            RETURNING *;
        `;
        const values = [make, model, year, price, mileage, description, vehicleId];
        const result = await pool.query(query, values);

        return result.rows[0] || null;
    } catch (error) {
        console.error("Database error - updateVehicle:", error);
        throw error;
    }
}

/* ****************************************
 *  Delete a vehicle
 * **************************************** */
async function deleteVehicle(vehicleId) {
    try {
        const result = await pool.query("DELETE FROM vehicles WHERE vehicle_id = $1 RETURNING *;", [vehicleId]);
        return result.rows[0] ? true : false;
    } catch (error) {
        console.error("Database error - deleteVehicle:", error);
        throw error;
    }
}

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
