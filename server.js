/******************************************
 * Primary Server File for CSE Motors App
 * Manages Routing, Middleware, and Server Configurations
 ******************************************/

/* ***********************
 * 1. Require Statements
 *************************/
require("dotenv").config(); // Load environment variables

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

// Import database connection
const pool = require("./database");

// Import Routes
const staticRoutes = require("./routes/static"); // Static pages (home, about, etc.)
const inventoryRoutes = require("./routes/inventory"); // Inventory management routes
const mainRoutes = require("./routes"); // Main application routes
const baseController = require("./controllers/baseController"); // Base controller

/* ***********************
 * 2. App Configuration
 *************************/
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Define default layout

// Middleware to parse request body data
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files (CSS, Images, JS)
app.use(express.static(path.join(__dirname, "public")));

/* ***********************
 * 3. Middleware and Routes
 *************************/

// Load static routes (home, about, contact, etc.)
app.use(staticRoutes);

// Home Route (Updated to use baseController)
app.use("/", mainRoutes); // Use main routes

// Inventory Routes
app.use("/inv", inventoryRoutes);

/* ***********************
 * 4. Error Handling Middleware
 *************************/

// 404 Page Not Found Handler
app.use((req, res, next) => {
  res.status(404).render("errors/404", { title: "Page Not Found" });
});

// Global Error Handler (Catches Server Errors)
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);
  
  // Check if the request expects JSON
  if (req.accepts("json")) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  res.status(500).render("errors/500", { title: "Server Error" });
});

/* ***********************
 * 5. Database Connection Test
 *************************/
async function testDatabaseConnection() {
  try {
    const result = await pool.query("SELECT 1");
    console.log("✅ Database Connection Successful!");
  } catch (error) {
    console.error("❌ Database Connection Failed!", error);
  }
}
testDatabaseConnection();

/* ***********************
 * 6. Server Configuration
 *************************/
const PORT = process.env.PORT || 5500; // Use dynamic port for Render

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
