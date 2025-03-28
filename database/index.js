const { Pool } = require("pg");
require("dotenv").config();

let pool;
if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Only for local testing
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true }, // Use true in production for security
  });
}

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      console.log("✅ Executed Query:", { text });
      return res;
    } catch (error) {
      console.error("❌ Database Query Error:", error);
      throw error;
    }
  },
};
