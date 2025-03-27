const pool = require('../config/db');

exports.getById = async (inv_id) => {
    const query = 'SELECT * FROM inventory WHERE inv_id = $1';
    const { rows } = await pool.query(query, [inv_id]);
    return rows[0];
};
