// middleware/validationMiddleware.js

// Validation function to check classification name
module.exports = (req, res, next) => {
    const { classification_name } = req.body;
    const errors = [];
  
    // Check for non-alphanumeric characters or spaces
    if (!classification_name || !/^[a-zA-Z0-9]+$/.test(classification_name)) {
      errors.push('Classification name must contain only alphanumeric characters (no spaces or special characters).');
    }
  
    if (errors.length > 0) {
      // Pass the errors to the controller if validation fails
      req.errors = errors;
      return res.redirect('/inventory/add-classification');
    }
  
    next();  // If validation passes, continue to the controller
  };
  