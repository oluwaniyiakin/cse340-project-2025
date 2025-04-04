const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const baseController = require("../controllers/baseController");

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Use the register route in the account controller
router.get("/register", utilities.handleErrors(accountController.buildRegister));

router.post('/register', utilities.handleErrors(accountController.registerAccount));


module.exports = router;
