const express = require("express");
const router = express.Router();

// ✅ Show Registration Page
router.get("/register", (req, res) => {
    res.render("account/register", { messages: {} });
});

// ✅ Handle Registration Form Submission
router.post("/register", async (req, res) => {
    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    if (!account_firstname || !account_lastname || !account_email || !account_password) {
        return res.render("account/register", { messages: { error: "All fields are required!" } });
    }

    // 🚀 Save user to database (for now, just redirect)
    console.log("New user registered:", { account_firstname, account_lastname, account_email });

    res.render("account/register", { messages: { success: "Registration successful! You can now login." } });
});

module.exports = router;
