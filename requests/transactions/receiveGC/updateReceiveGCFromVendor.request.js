const { body } = require('express-validator');

exports.validate = () => {
    return [
        body('controlNumber')
            .isNumeric().withMessage('Unknown Control Number.')
            .exists().withMessage('Control Number is required')
            .isLength({ min: 1 }).withMessage('Control Number must have at least 1 character.')
            .isLength({ max: 11 }).withMessage('Control Number cannot have more than 11 characters.'),
        body('pONumber')
            .isString().withMessage('Unknown PO Number.')
            .exists().withMessage('PO Number is required.')
            .isLength({ min: 3 }).withMessage('PO Number must have at least 3 characters.')
            .isLength({ max: 50 }).withMessage('PO Number cannot have more than 50 characters.'),
        body('dRNumber')
            .isString().withMessage('Unknown DR Number.')
            .exists().withMessage('DR Number is required.')
            .isLength({ min: 3 }).withMessage('DR Number must have at least 3 characters.')
            .isLength({ max: 50 }).withMessage('DR Number cannot have more than 50 characters.'),
        body('vendorName')
            .isString().withMessage('Unknown Vendor Name.')
            .exists().withMessage('Vendor Name is required.')
            .isLength({ min: 3 }).withMessage('Vendor Name must have at least 3 characters.')
            .isLength({ max: 50 }).withMessage('Vendor Name cannot have more than 50 characters.'),
        body('remarks')
            .isString().withMessage('Unknown Remarks.')
            .exists().withMessage('Remarks is required.')
            .isLength({ min: 5 }).withMessage('Remarks must have at least 5 characters.')
            .isLength({ max: 100 }).withMessage('Remarks cannot have more than 100 characters.'),
        body('gCNumberFrom')
            .isNumeric().withMessage('Unknown GC Number From.')
            .exists().withMessage('GC Number From is required')
            .isLength({ min: 1 }).withMessage('GC Number From must have at least 1 character.')
            .isLength({ max: 11 }).withMessage('GC Number From cannot have more than 11 characters.'),
        body('gCNumberTo')
            .isNumeric().withMessage('Unknown GC Number To.')
            .exists().withMessage('GC Number To is required')
            .isLength({ min: 1 }).withMessage('GC Number To must have at least 1 character.')
            .isLength({ max: 11 }).withMessage('GC Number To cannot have more than 11 characters.'),
        body('amount')
            .isFloat().withMessage('Unknown Amount.')
            .exists().withMessage('Amount is required')
            .isLength({ min: 1 }).withMessage('Amount must have at least 1 character.')
            .isLength({ max: 11 }).withMessage('Amount cannot have more than 11 characters.'),
    ]
};