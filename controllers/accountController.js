// Import required modules
const accountModel = require("../models/account-model");
const utilities = require("../utilities/");

/* ****************************************
 *  Render Login Page
 * *************************************** */
async function buildLogin(req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("account/login", {
      title: "Login",
      nav,
      messages: {}, // Ensures messages object is always available
    });
  } catch (error) {
    console.error("❌ Error rendering login page:", error);
    next(error); // Pass error to Express error handler
  }
}

/* ****************************************
 *  Render Registration Page
 * *************************************** */
async function buildRegister(req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("account/register", {
      title: "Register",
      nav,
      messages: {}, // Ensures messages object is always available
    });
  } catch (error) {
    console.error("❌ Error rendering register page:", error);
    next(error);
  }
}

/* ****************************************
 *  Process User Registration
 * *************************************** */
async function registerAccount(req, res, next) {
  try {
    let nav = await utilities.getNav();

    // Extract user input from request body
    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    // Validate required fields
    if (!account_firstname || !account_lastname || !account_email || !account_password) {
      req.flash("notice", "All fields are required.");
      return res.status(400).render("account/register", { title: "Register", nav });
    }

    // Call model function to insert new account into database
    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password
    );

    // If the insert was successful
    if (regResult.rowCount > 0) {
      req.flash("notice", `Congratulations, ${account_firstname}! Your account has been created. Please log in.`);
      return res.status(201).render("account/login", { title: "Login", nav });
    } else {
      req.flash("notice", "Registration failed. Please try again.");
      return res.status(500).render("account/register", { title: "Register", nav });
    }
  } catch (error) {
    console.error("❌ Error in registerAccount:", error);
    next(error);
  }
}

// Export functions
module.exports = { buildLogin, buildRegister, registerAccount };
