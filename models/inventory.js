const pool = require("../database");

async function getAllVehicles() {
    try {
        const result = await pool.query("SELECT * FROM inventory");
        return result.rows;
    } catch (error) {
        console.error("❌ Error fetching vehicles:", error);
        throw error;
    }
}

module.exports = { getAllVehicles };
