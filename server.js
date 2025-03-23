const express = require("express");
const path = require("path");

const app = express();

// Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
const vehicleRoutes = require("./routes/vehicleRoutes");
app.use("/vehicles", vehicleRoutes);

// Home route
app.get("/", (req, res) => {
    res.redirect("/vehicles");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
