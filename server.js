/* ******************************************
 * This server.js file is the primary entry 
 * point of the application. It controls 
 * routing, views, middleware, and error handling.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
require("dotenv").config()
const express = require("express")
const expressLayouts = require("express-ejs-layouts")

const app = express()

const staticRoutes = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoute")
const baseController = require("./controllers/baseController")
const utilities = require("./utilities")

const session = require("express-session")
const pool = require('./database/')

const accountRoute = require("./routes/accountRoute");

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // parse cookies from incoming requests
/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))


// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // layout not in views root



/* ***********************
 * Middleware
 *************************/
app.use(express.static("public"))
app.use(staticRoutes)

/* ***********************
 * Routes
 *************************/
// Home page
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inventory", inventoryRoutes)

app.use("/account", accountRoute);

/* ***********************
 * File Not Found Route
 * This must be the last route
 *************************/
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

/* ***********************
 * Error Handling Middleware
 * This handles any errors thrown in the app
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  const status = err.status || 500
  const message = err.message || "Oh no! There was a crash. Maybe try a different route?"

  console.error(`Error at "${req.originalUrl}": ${message}`)

  res.status(status).render("errors/error", {
    title: status,
    message,
    nav,
  })
})

/* ***********************
 * Server Initialization
 *************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.listen(port, () => {
  console.log(`App listening on http://${host}:${port}`)
})
