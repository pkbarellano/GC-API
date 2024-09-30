const { body } = require('express-validator');

exports.validate = () => {
    return [
        body('username')
            .isString().withMessage('Unknown Username.')
            .exists().withMessage('Username is required.')
            .isLength({ min: 6 }).withMessage('Username must have at least 6 characters.')
            .isLength({ max: 15 }).withMessage('Username cannot have more than 15 characters.'),
        body('password')
            .isString().withMessage('Unknown Password.')
            .exists().withMessage('Username is required.')
            .isLength({ min: 6 }).withMessage('Password must have at least 6 characters.')
            .isLength({ max: 100 }).withMessage('Password cannot have more than 100 characters.')
    ];
};