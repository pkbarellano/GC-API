const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        const err = errors.errors;

        return res.status(422).send({
            status: false,
            message: err[0].msg
        });
    }
};

module.exports = {

    validateResult: validateResult
};