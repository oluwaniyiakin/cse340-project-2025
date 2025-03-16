/******************************************
 * Primary Server File for CSE Motors App
 * Manages Routing, Middleware, and Server Configurations
 ******************************************/

/* ***********************
 * 1. Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
require("dotenv").config(); // Load environment variables

// Import Routes
const staticRoutes = require("./routes/static"); // Static routes (home, about, etc.)
const baseController = require("./controllers/baseController"); // Import base controller

/* ***********************
 * 2. App Configuration
 *************************/
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Define default layout

// Serve static files (CSS, Images, JS)
app.use(express.static(path.join(__dirname, "public")));

/* ***********************
 * 3. Middleware and Routes
 *************************/
// Load static routes (home, about, contact, etc.)
app.use(staticRoutes);

// Home Route (Updated to use baseController)
app.get("/", baseController.buildHome);

/* ***********************
 * 4. Error Handling Middleware
 *************************/

// 404 Page Not Found Handler
app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Global Error Handler (Catches Server Errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { title: "Server Error" });
});

/* ***********************
 * 5. Server Configuration
 *************************/
const PORT = process.env.PORT || 5500; // Use dynamic port for Render
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
