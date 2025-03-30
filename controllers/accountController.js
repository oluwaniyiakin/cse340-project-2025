const utilities = require("../utilities/");

/* ****************************************
 *  Deliver Login View
 * *************************************** */
async function buildLogin(req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("account/login", {
      title: "Login",
      nav,
    });
  } catch (error) {
    console.error("Error rendering login page:", error);
    next(error);
  }
}

module.exports = { buildLogin };
