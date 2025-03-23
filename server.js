const express = require("express");
const path = require("path");
const fs = require("fs");
const vehicleRoutes = require("./routes/vehicleRoutes"); // ✅ Import vehicle routes

const app = express();
const PORT = process.env.PORT || 3000;

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


// ✅ Home Page Route (Displays Vehicle List)
app.get("/", (req, res) => {
    try {
        const vehicles = require("./data/vehicles.json"); // ✅ Load vehicle data
        res.render("vehicle-list", { vehicles }); // ✅ Render vehicle list view
    } catch (error) {
        console.error("Error loading vehicle data:", error);
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


