const express = require("express");
const router = express.Router();

router.get("/trigger", (req, res, next) => {
  // Intentionally throw an error
  next(new Error("Intentional Error for Testing"));
});

module.exports = router;
