const { body } = require('express-validator');

exports.validate = () => {
    return [
        body('iD')
            .isArray().withMessage('Unknown Transaction ID.')
            .exists().withMessage('Transaction ID is required.')
    ]
};