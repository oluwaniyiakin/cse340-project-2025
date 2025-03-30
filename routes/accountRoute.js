const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/"); 
const regValidate = require("../utilities/account-validation");

// ✅ Login Route
router.get("/login", accountController.buildLogin);

// ✅ Show Registration Page
router.get("/register", (req, res) => {
    res.render("account/register", { messages: {} });
});

// ✅ Handle Registration Form Submission with Validation
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
);

// ✅ Error Handling Middleware
router.use((err, req, res, next) => {
    console.error("❌ Account Route Error:", err.stack);
    res.status(500).render("500", { message: "Internal Server Error" });
});

module.exports = router;
