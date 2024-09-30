const { body } = require('express-validator');

exports.validate = () => {
    return [
        body('iD')
            .isNumeric().withMessage('Unknown Transaction ID.')
            .exists().withMessage('Transaction ID is required.')
            .isLength({ min: 1 }).withMessage('Transaction ID must have at least 1 character.')
            .isLength({ max: 6 }).withMessage('Transaction ID cannot have more than 6 characters.')
    ]
};