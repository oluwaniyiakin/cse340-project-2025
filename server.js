// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");
const flash = require("connect-flash");
const { engine } = require("express-handlebars");

// Import routes and utilities
const inventoryRoutes = require("./routes/inventory");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5500;

// Set up view engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev")); // Logger middleware
app.use(flash());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Custom Middleware for Flash Messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Home Route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Inventory Routes
app.use("/inventory", inventoryRoutes);

// **Intentional Error Route for Task 3**
app.get("/error", (req, res, next) => {
  throw new Error("This is an intentional server error.");
});

// 404 Error Handler (Page Not Found)
app.use((req, res, next) => {
  res.status(404).render("error", { title: "404 - Page Not Found", message: "The page you requested does not exist." });
});

// Global Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
