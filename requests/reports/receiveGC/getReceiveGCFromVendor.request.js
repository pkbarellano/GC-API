const { body } = require('express-validator');

exports.validate = () => {
    return [
        body('dateFrom')
            .isString().withMessage('Unknown Date From.')
            .exists().withMessage('Date From is required.')
            .isLength({ max: 15 }).withMessage('Date From cannot have more than 15 characters.'),
        body('dateTo')
            .isString().withMessage('Unknown Date To.')
            .exists().withMessage('Date To is required.')
            .isLength({ max: 15 }).withMessage('Date To cannot have more than 15 characters.')
    ];
};