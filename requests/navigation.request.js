const { body } = require('express-validator');

exports.validate = () => {

    return [
        body('groupID')
            .isNumeric().withMessage('Unknown Group ID.')
            .exists().withMessage('Group ID is required.')
            .isLength({ min: 1 }).withMessage('Group ID must have at least 1 character.')
            .isLength({ max: 4 }).withMessage('Group ID cannot have more than 4 characters.'),
        body('level')
            .isString().withMessage('Unknown Navigation Level.')
            .exists().withMessage('Navigation Level is required.')
            .isLength({ min: 4 }).withMessage('Navigation Level must have at least 4 characters.')
            .isLength({ max: 5 }).withMessage('Navigation Level cannot have more than 5 characters.')
    ];
};