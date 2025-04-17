const { Pool } = require("pg");
require("dotenv").config();

// Always enable SSL for databases like Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // allow self-signed certs (Render requirement)
  },
});

const db = {
  query: async (text, params) => {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (error) {
      console.error("❌ Error in query", { text, error });
      throw error;
    }
  }
};

module.exports = db;
