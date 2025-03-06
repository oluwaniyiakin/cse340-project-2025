/******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 ******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config(); // Ensure dotenv is loaded
const staticRoutes = require("./routes/static"); // Rename for clarity

const app = express();

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Layout file location

/* ***********************
 * Middleware for Static Files
 *************************/
app.use(staticRoutes); // Serve static files

/* ***********************
 * Routes
 *************************/
// Home Route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* ***********************
 * Server Configuration
 *************************/
const PORT = process.env.PORT || 5500; // Use Render's dynamic PORT
app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`);
});
