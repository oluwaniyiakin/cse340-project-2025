const express = require("express");
const path = require("path"); // Ensure static file serving
const vehicleRoutes = require("./routes/vehicleRoutes"); // ✅ Import vehicle routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // ✅ Parses JSON
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data
app.use(express.static(path.join(__dirname, "public"))); // ✅ Ensure images load from /public

// Set view engine to EJS (Make sure you have EJS installed)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure correct views folder

// Routes
app.use("/vehicles", vehicleRoutes); // ✅ Vehicle Routes

// Home Page Route (Displays Vehicles List)
app.get("/", (req, res) => {
    const vehicles = require("./data/vehicles.json"); // ✅ Load vehicle data
    res.render("vehicle-list", { vehicles }); // ✅ Render vehicle list view
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
