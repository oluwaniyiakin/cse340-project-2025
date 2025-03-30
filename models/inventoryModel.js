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
}

module.exports = { getVehicleById };
