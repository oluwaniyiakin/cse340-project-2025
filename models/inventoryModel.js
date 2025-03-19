const pool = require("../database");

async function getVehicleById(inv_id) {
    try {
        const result = await pool.query(
            `SELECT * FROM inventory WHERE inv_id = $1`, [inv_id]
        );

        let vehicle = result.rows[0];

        if (vehicle) {
            // Fetch additional images if available
            const imageResults = await pool.query(
                `SELECT image_url FROM vehicle_images WHERE vehicle_id = $1`, [inv_id]
            );

            vehicle.images = imageResults.rows.map(row => row.image_url);
        }

        return vehicle;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}

module.exports = { getVehicleById };
