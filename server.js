require("dotenv").config();
const express = require("express");
const path = require("path");
const { Pool } = require("pg"); // ✅ Import PostgreSQL client
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");

// ✅ Import Routes
const vehicleRoutes = require("./routes/vehicleRoutes");
const accountRoutes = require("./routes/accountRoute"); // ✅ Ensure the correct filename!

const app = express();

// ✅ Define PORT (Default to 5500 if not set in .env)
const PORT = process.env.PORT || 5500;

// ✅ PostgreSQL Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // ✅ Use DATABASE_URL from .env
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // ✅ Only enable SSL in production
});

// ✅ Middleware
app.use(express.json()); // ✅ Parses JSON requests
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data
app.use(express.static(path.join(__dirname, "public"))); // ✅ Serve static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // ✅ Parse form data

// ✅ Configure session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mySecret123", // 🔥 Use a secure key from .env
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.NODE_ENV === "production" }, // ✅ Secure cookies in production
    })
);

// ✅ Initialize express-flash
app.use(flash());

// ✅ Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// ✅ Set View Engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Register Routes
app.use("/vehicles", vehicleRoutes);
app.use("/account", accountRoutes); // 🔥 Handles /account/login & /account/register

// ✅ Home Page Route (Fetch Vehicles from PostgreSQL)
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM vehicles"); // ✅ Fetch data from `vehicles` table
        const vehicles = result.rows;
        res.render("vehicle-list", { vehicles, notice: "" });
    } catch (error) {
        console.error("❌ Error loading vehicle data:", error);
        req.flash("error", "Error loading vehicle data");
        res.status(500).render("500", { message: "Error loading vehicle data" });
    }
});

// ✅ 404 Error Handling (Page Not Found)
app.use((req, res) => {
    res.status(404).render("404", { message: "Page Not Found" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    req.flash("error", "Internal Server Error");
    res.status(500).render("500", { message: "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
