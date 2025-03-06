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

const staticRoutes = require("./routes/static"); // Serve static content

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

// Home Route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* ***********************
 * 4. Server Configuration
 *************************/
const PORT = process.env.PORT || 5500; // Use dynamic port for Render
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
