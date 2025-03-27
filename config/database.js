const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Render PostgreSQL
  max: 5, // Limits the max number of clients (helps prevent connection issues)
  idleTimeoutMillis: 30000, // Closes idle connections after 30 seconds
  connectionTimeoutMillis: 5000, // Waits 5 seconds before timeout
});

// Test database connection
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL Database!");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection error:", err);
  });

module.exports = pool;
