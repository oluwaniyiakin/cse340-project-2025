const pool = require('./db');

const getVehicleById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM vehicles WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }
};

module.exports = { getVehicleById };
