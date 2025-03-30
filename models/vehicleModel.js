<<<<<<< HEAD
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
=======
const fs = require("fs");
const path = require("path");

const vehiclesFilePath = path.join(__dirname, "../data/vehicles.json");

function getAllVehicles() {
    try {
        const data = fs.readFileSync(vehiclesFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ Error reading vehicles JSON:", error);
        return [];
    }
}

function getVehicleById(id) {
    const vehicles = getAllVehicles();
    return vehicles.find(vehicle => vehicle.inv_id == id);
}

module.exports = { getAllVehicles, getVehicleById };
>>>>>>> d9ce623bd073062dc418caa107ad7638d1eaa0c2
