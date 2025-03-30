require("dotenv").config();
const express = require("express");
const path = require("path");
const { Pool } = require("pg"); // ✅ Import PostgreSQL client
const vehicleRoutes = require("./routes/vehicleRoutes"); // ✅ Import vehicle routes

const app = express();

// ✅ Define PORT (Default to 5500 if not set in .env)
const PORT = process.env.PORT || 5500;

// ✅ PostgreSQL Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use DATABASE_URL from .env
    ssl: { rejectUnauthorized: false } // For Render/Heroku deployments
});

// ✅ Middleware
app.use(express.json()); // Parses JSON
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// ✅ Serve Static Files (CSS, Images, JS)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Set View Engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Vehicle Routes
app.use("/vehicles", vehicleRoutes);

// ✅ Home Page Route (Fetch Vehicles from PostgreSQL)
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM vehicles"); // ✅ Fetch data from `vehicles` table
        const vehicles = result.rows; // ✅ Get rows from query result
        res.render("vehicle-list", { vehicles }); // ✅ Render vehicle list view
    } catch (error) {
        console.error("❌ Error loading vehicle data:", error);
        res.status(500).send("Error loading vehicle data");
    }
});

// ✅ 404 Error Handling (Page Not Found)
app.use((req, res) => {
    res.status(404).render("404", { message: "Page Not Found" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).render("500", { message: "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
