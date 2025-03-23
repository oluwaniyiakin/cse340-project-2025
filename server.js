const express = require("express");
const path = require("path"); 
const vehicleRoutes = require("./routes/vehicleRoutes"); // ✅ Import vehicle routes

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json()); // Parses JSON
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// ✅ Static File Serving (CSS, Images, JS)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Set View Engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

// ✅ Routes
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

// ✅ 404 Page Not Found Middleware
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
