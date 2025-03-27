const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10, // Maximum connections
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Timeout if no connection in 2s
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL Database!");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err.message);
});

module.exports = pool; // 🔥 Ensure pool is exported
