const { body, validationResult } = require('express-validator')

exports.checkClassification = [
  body('classification_name')
    .trim()
    .isAlphanumeric()
    .withMessage('Classification name must contain only letters and numbers.')
    .isLength({ min: 2 })
    .withMessage('Classification name must be at least 2 characters long.'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.flash('message', errors.array()[0].msg)
      return res.redirect('/inv/add-classification')
    }
    next()
  }
]
