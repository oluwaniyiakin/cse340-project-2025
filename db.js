const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in .env
  ssl: {
    rejectUnauthorized: false, // Required for Render
  },
});

module.exports = pool;
