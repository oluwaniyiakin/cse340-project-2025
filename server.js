const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const flash = require("connect-flash");
require("dotenv").config();

const pool = require("./config/database");
const utilities = require("./utilities");
const routes = require("./routes/index");
const accountRoute = require("./routes/accountRoute");

const app = express();

// ✅ Middleware for Parsing Requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Session Middleware
app.use(
  session({
    store: new pgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false, // Set to false for better performance
    saveUninitialized: false, // Avoid storing empty sessions
    name: "sessionId",
    cookie: {
      secure: false, // Change to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Flash Middleware for Messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.notice = req.flash("notice");
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// ✅ Set View Engine & Layout
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout"); // Ensure this file exists in "views"

// ✅ Serve Static Files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Register Routes
app.use("/", routes);
app.use("/account", accountRoute); // Ensure this file exists

// ✅ 404 Error Handler
app.use((req, res, next) => {
  const error = new Error("Sorry, we appear to have lost that page.");
  error.status = 404;
  next(error);
});

// ✅ Global Error Handler
app.use(async (err, req, res, next) => {
  let nav = "";
  try {
    nav = await utilities.getNav();
  } catch (navErr) {
    console.error("Error fetching navigation:", navErr);
  }

  console.error(`Error at "${req.originalUrl}":`, err.message);
  const status = err.status || 500;
  const message =
    status === 404
      ? err.message
      : "Oh no! Something went wrong on our end. Try again later.";

  res.status(status).render("errors/500", {
    title: status + " Error",
    message,
    nav,
  });
});

// ✅ Start the Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
