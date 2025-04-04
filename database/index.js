const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * - In development, we disable SSL for local testing.
 * - In production (Render PostgreSQL), we enable SSL.
 * *************** */
const isDevelopment = process.env.NODE_ENV === "development";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isDevelopment ? false : { rejectUnauthorized: false },
});

// Added for troubleshooting queries during development
const db = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (error) {
      console.error("Error in query", { text, error });
      throw error;
    }
  },
};

// Export the correct pool object
module.exports = isDevelopment ? db : pool;
