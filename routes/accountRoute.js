const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/"); // ✅ Import utilities

// ✅ Login Route
router.get("/login", accountController.buildLogin);
router.post('/register', utilities.handleErrors(accountController.registerAccount));

// ✅ Show Registration Page
router.get("/register", (req, res) => {
    res.render("account/register", { messages: {} });
});

// ✅ Handle Registration Form Submission
router.post("/register", async (req, res) => {
    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    // 🚨 Validate Fields
    if (!account_firstname || !account_lastname || !account_email || !account_password) {
        return res.render("account/register", { messages: { error: "All fields are required!" } });
    }

    // 🚀 Simulate Saving to Database (Replace with DB Logic)
    console.log("✅ New User Registered:", { account_firstname, account_lastname, account_email });

    res.render("account/register", { messages: { success: "Registration successful! You can now log in." } });
});

// ✅ Error Handling Middleware
router.use((err, req, res, next) => {
    console.error("❌ Account Route Error:", err.stack);
    res.status(500).render("500", { message: "Internal Server Error" });
});

module.exports = router;
