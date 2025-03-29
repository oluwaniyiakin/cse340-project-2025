require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");

const routes = require("./routes/index"); // Main routes file
const vehicleRoutes = require("./routes/vehicle");
const inventoryRoutes = require("./routes/inventory");

const app = express();

// Middleware
app.use(morgan("dev")); // Logs HTTP requests
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(methodOverride("_method")); // Allows PUT/DELETE in forms

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/images/vehicles",
  express.static(path.join(__dirname, "public", "images", "vehicles"))
); // Serve vehicle images

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Local Vehicle Data with Fallback Images
// Local Vehicle Data with Vehicle Type and Manufacturing Year
const vehicles = [
  {
    id: 1,
    name: "Fire Truck",
    type: "Truck",
    year: 2015,
    price: "$50,000",
    mileage: "12,000 miles",
    description: "A powerful fire truck.",
    image: "fire-truck.JPG",
  },
  {
    id: 2,
    name: "Monster Truck",
    type: "Truck",
    year: 2018,
    price: "$75,000",
    mileage: "9,500 miles",
    description: "A massive monster truck.",
    image: "monster-truck.JPG",
  },
  {
    id: 3,
    name: "Mystery Van",
    type: "Van",
    year: 2012,
    price: "$30,000",
    mileage: "15,000 miles",
    description: "A mysterious van for adventures.",
    image: "mystery-van.JPG",
  },
  {
    id: 4,
    name: "Tesla Model S",
    type: "Sedan",
    year: 2020,
    price: "$85,000",
    mileage: "5,000 miles",
    description: "A high-tech electric car.",
    image: "adventador.JPG", // Placeholder image
  },
  {
    id: 5,
    name: "Ford Mustang GT",
    type: "Coupe",
    year: 2017,
    price: "$60,000",
    mileage: "8,000 miles",
    description: "A classic American muscle car.",
    image: "batmobile.JPG", // Placeholder image
  },
  {
    id: 6,
    name: "Chevrolet Silverado 1500",
    type: "Truck",
    year: 2019,
    price: "$55,000",
    mileage: "10,000 miles",
    description: "A reliable pickup truck.",
    image: "camaro.JPG", // Placeholder image
  },
  {
    id: 7,
    name: "Honda Accord Hybrid",
    type: "Sedan",
    year: 2021,
    price: "$35,000",
    mileage: "6,000 miles",
    description: "A fuel-efficient hybrid sedan.",
    image: "dog-car.JPG", // Placeholder image
  },
  {
    id: 8,
    name: "Jeep Wrangler",
    type: "SUV",
    year: 2016,
    price: "$45,000",
    mileage: "7,500 miles",
    description: "An iconic off-road vehicle.",
    image: "wrangler.JPG",
  },
  {
    id: 9,
    name: "GMC Survan",
    type: "Van",
    year: 2014,
    price: "$40,000",
    mileage: "13,000 miles",
    description: "A spacious van for all your needs.",
    image: "survan.JPG",
  },
];

// ✅ Home route (List all vehicles)
app.get("/", (req, res) => {
  res.render("home", { vehicles });
});

// ✅ Vehicle detail route (Show details of a single vehicle)
app.get("/vehicle/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return res.status(404).render("error/404", { title: "Vehicle Not Found" });
  }

  res.render("vehicle-detail", { vehicle });
});

// Routes
app.use("/vehicles", vehicleRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/", routes);

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).render("error/404", { title: "Page Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error/500", { title: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
