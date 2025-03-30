<<<<<<< HEAD
const db = require("../config/database");

/**
 * Get a vehicle by its inventory ID using a prepared statement.
 * @param {number} inv_id - The inventory ID of the vehicle.
 * @returns {Object} Vehicle data.
 */
async function getVehicleById(inv_id) {
  try {
    const query = "SELECT * FROM inventory WHERE inv_id = $1";
    const { rows } = await db.query(query, [inv_id]);
    return rows[0]; // Return the single vehicle row
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    throw error;
  }
=======
const pool = require("../db");

async function getVehicleById(inventoryId) {
    try {
        const result = await pool.query("SELECT * FROM inventory WHERE inventory_id = $1", [inventoryId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("❌ Database query error:", error);
        return null;
    }
>>>>>>> d9ce623bd073062dc418caa107ad7638d1eaa0c2
}

module.exports = { getVehicleById };
