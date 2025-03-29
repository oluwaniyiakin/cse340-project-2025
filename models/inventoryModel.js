const pool = require("../db");

async function getVehicleById(inventoryId) {
    try {
        const result = await pool.query("SELECT * FROM inventory WHERE inventory_id = $1", [inventoryId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("❌ Database query error:", error);
        return null;
    }
}

module.exports = { getVehicleById };
