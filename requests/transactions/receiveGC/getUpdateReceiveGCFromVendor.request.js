const { body } = require('express-validator');

exports.validate = () => {
    return [
        body('apiKey')
            .isString().withMessage('Unknown Session ID.')
            .exists().withMessage('Session ID is required.')
            .isLength({ min: 10 }).withMessage('Session ID must have at least 10 characters.')
            .isLength({ max: 100 }).withMessage('Session ID cannot have more than 100 characters.'),
        body('levelNumber')
            .isNumeric().withMessage('Unknown Level Number.')
            .exists().withMessage('Level Number is required.')
            .isLength({ min: 1 }).withMessage('Level Number must have at least 1 character.')
            .isLength({ max: 11 }).withMessage('Level Number cannot have more than 11 characters.')
    ]
};