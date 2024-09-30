const { body } = require('express-validator');

exports.validate = () => {

    return [
        body('apiKey')
            .isString().withMessage('Unknown Session ID.')
            .exists().withMessage('Session ID is required.')
            .isLength({min: 10}).withMessage('Session ID must have at least 10 characters.')
            .isLength({ max: 100 }).withMessage('Session ID cannot have more than 100 characters.')
    ];
};