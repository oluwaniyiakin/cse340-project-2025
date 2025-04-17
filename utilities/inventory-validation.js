const { body, validationResult } = require("express-validator");

const inventoryRules = () => [
  body("inv_make").trim().notEmpty().withMessage("Make required"),
  body("inv_model").trim().notEmpty().withMessage("Model required"),
  body("inv_year").isInt({ min: 1900 }).withMessage("Valid year required"),
  body("inv_price").isFloat({ min: 0 }).withMessage("Price must be positive"),
  body("classification_id").isInt().withMessage("Choose a classification")
];

const checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let classificationList = await utilities.buildClassificationList(req.body.classification_id);

    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      classificationList,
      errors: errors.array(),
      stickyData: req.body
    });
  } else {
    next();
  }
};

module.exports = { inventoryRules, checkInventoryData };
