const pool = require("../db");

exports.getVehicleById = async (vehicleId) => {
  const query = "SELECT * FROM vehicles WHERE id = $1";
  const { rows } = await pool.query(query, [vehicleId]);
  return rows[0];
};
