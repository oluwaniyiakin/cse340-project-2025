const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://cse3402025b:z5qU88pAQlnafRg8cPGYJTPq001RUvQw@dpg-cva63itds78s73c09q2g-a.oregon-postgres.render.com/cse3402025b",
  ssl: { rejectUnauthorized: false }, // Required for cloud-based PostgreSQL
  connectionTimeoutMillis: 10000, // Increase timeout
});

async function testDB() {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully!");
    client.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testDB();
