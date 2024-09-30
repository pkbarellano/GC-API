const db = require('../models');
const GCAmounts = db.gCAmount;

const _gCAmounts = res => {

    GCAmounts.findAll({
        attributes: ['amount'],
    }).then(data => {

        const amounts = data.map((item, index) => {

            return item.amount;
        });

        res.status(200).send({
            status: true,
            data: {
                amounts: amounts
            }
        });
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve gift certificate amounts. Please retry or contact your administrator for assistance.'
        });
    });
};

const getGCAmounts = (req, res, next) => {

    _gCAmounts(res);
};

module.exports = {
    getGCAmounts: getGCAmounts
};