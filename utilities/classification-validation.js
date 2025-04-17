const { body, validationResult } = require("express-validator");

const classificationRules = () => {
  return [body("classification_name").trim().isAlphanumeric().isLength({ min: 1 }).withMessage("Valid name required")];
};

const checkClassificationData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array()
    });
  } else {
    next();
  }
};

module.exports = { classificationRules, checkClassificationData };
