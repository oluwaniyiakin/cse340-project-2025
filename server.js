const express = require("express");
const path = require("path"); // Ensure static file serving
const vehicleRoutes = require("./routes/vehicleRoutes"); // ✅ Import routes correctly

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // ✅ Parses JSON
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data

// Serve static files (Ensure images load properly)
app.use(express.static(path.join(__dirname, "public"))); // ✅ Ensure images load from /public

// Routes
app.use("/vehicles", vehicleRoutes); // ✅ Use routes correctly

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the Vehicle API! Use /vehicles to get started.");
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
