const { body } = require('express-validator');

exports.validate = () => {
    return [
        body('levelNumber')
            .isNumeric().withMessage('Unknown Level Number.')
            .exists().withMessage('Level Number is required.')
            .isLength({ min: 1 }).withMessage('Level Number must have at least 1 character.')
            .isLength({ max: 11 }).withMessage('Level Number cannot have more than 11 characters.')
    ];
};