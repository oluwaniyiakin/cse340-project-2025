const pool = require("../config/database"); // Import your DB connection

async function getAllVehicles() {
    const result = await pool.query("SELECT * FROM vehicles"); // Fetch from DB
    return result.rows; // Return all vehicles
}

module.exports = { getAllVehicles };
