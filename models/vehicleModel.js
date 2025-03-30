const db = require("../config/database");

/**
 * Fetch all vehicles from the database.
 * Limits results to 10 for performance.
 */
async function getAllVehicles() {
  try {
    const result = await db.query("SELECT * FROM vehicles LIMIT 10");

    // Debugging: Log fetched vehicles
    console.log("Query result:", result.rows);

    return result.rows;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error; // Ensures errors propagate properly
  }
}

module.exports = { getAllVehicles };
