const pool = require('../config/db');

exports.getById = async (inventory_id) => {
    const query = 'SELECT * FROM inventory WHERE inventory_id = $1';
    const { rows } = await pool.query(query, [inventory_id]);
    return rows[0];
};
