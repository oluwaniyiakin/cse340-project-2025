const { check, validationResult } = require("express-validator");

const invValidation = {};

// Validation rules for classification
invValidation.classificationRules = function () {
  return [
    check("classification_name", "Classification name is required").notEmpty(),
    check("classification_name", "Classification name cannot contain spaces or special characters").matches(/^[a-zA-Z0-9]+$/),
  ];
};

// Validation check for classification data
invValidation.checkClassificationData = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      errors: errors.array(),
      classification_name: req.body.classification_name,
    });
  }
  next();
};

module.exports = invValidation;
